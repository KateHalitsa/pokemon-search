import { cleanup, render, screen, waitFor  } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import '@testing-library/jest-dom/vitest';
import ErrorBoundary from "./ErrorBoundary";
import { afterEach } from 'vitest';

describe('Error Boundary Tests', () => {
    beforeEach(() => {
    const store: Record<string, string> = {};

    vi.stubGlobal('localStorage', {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => {
        store[key] = value;
        },
        removeItem: (key: string) => {
        delete store[key];
        },
        clear: () => {
        Object.keys(store).forEach(k => delete store[k]);
        },
    });
    
    });
    afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    });
    const BrokenComponent = () => {
        throw new Error('Test error');
    };
    describe('Error Catching Tests',()=>{
        test('Catches and handles JavaScript errors in child components',async()=>{
            expect(() => {
                render(
                <ErrorBoundary>
                    <BrokenComponent />
                </ErrorBoundary>
                );
            }).not.toThrow();
        })
        test('Displays fallback UI when error occurs',async()=>{
           render(
                <ErrorBoundary>
                    <BrokenComponent />
                </ErrorBoundary>
                );

            expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        })
         test('Logs error to console',async()=>{
           const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
           render(
                <ErrorBoundary>
                    <BrokenComponent />
                </ErrorBoundary>
                );

            expect(errorSpy).toHaveBeenCalled();
        })
    })
})