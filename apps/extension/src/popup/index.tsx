import * as ReactDOM from "react-dom/client";
import { t } from "@repo/i18n";

function Root() {
  return <a href={process.env.SITE_DOMAIN}>{t("Title")}</a>;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Root />);
