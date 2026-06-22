import './AboutPage.css'
import { useTranslations } from "next-intl";

function AboutPage() {
      const t = useTranslations("About");
  
  return (
    <div className="about">
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <div className='about-author'>
        <h2>{t("about-author-title")}</h2>
        {t("about-author-description")}
        </div>
    <a href='https://rs.school/courses/reactjs'> {t("link")}</a>
    </div>
  );
}
export default AboutPage
