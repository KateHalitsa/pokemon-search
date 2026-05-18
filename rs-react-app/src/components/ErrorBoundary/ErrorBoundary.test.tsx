import { cleanup, render, screen  } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import '@testing-library/jest-dom/vitest';
import ErrorBoundary from "./ErrorBoundary";
import { afterEach } from 'vitest';
import App from "../../App";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

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
    describe('Error Button Tests',()=>{
        test('Throws error when test button is clicked',async()=>{
             const user = userEvent.setup();

            vi.spyOn(console, 'error').mockImplementation(() => {});

            render(
                <ErrorBoundary>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </ErrorBoundary>
            );
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            await user.click(screen.getByText('Error'));

            expect(errorSpy).toHaveBeenCalled();
        })
        test('Throws error when test button is clicked',async()=>{
             const user = userEvent.setup();

            vi.spyOn(console, 'error').mockImplementation(() => {});

            render(
                <ErrorBoundary>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </ErrorBoundary>
            );
            await user.click(screen.getByText('Error'));

            expect(
                screen.getByText('Something went wrong')
            ).toBeInTheDocument();
        })

    })
})