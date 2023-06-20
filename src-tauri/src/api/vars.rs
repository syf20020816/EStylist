//! Bind Vars
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```
//!

pub const CONF_DIR: &str = "conf";
pub const CONF_FILE: &str = "EStylist_config";
pub const TEMPLATE_DIR: &str = "templates";
pub const DOC_DIR: &str = "doc";
pub const DOC_FILE: &str = "download_url";
pub const DOC_DOWNLOAD_URL: &str = "git clone https://github.com/syf20020816/EStylist.wiki.git";
pub const README: &str = "README";
pub const README_CONTENT: [&str; 4] = [
    "# EStylist",
    " - author : syf20020816@outlook.com",
    " - repository : https://github.com/syf20020816/EStylist",
    "EStylist means email designer. I wonder if you are often troubled by ugly emails and want to pursue the layout and style of emails.\n Do you want emails as exquisite as Stream or GitHub? Let EStylist help you build exquisite emails!"
];

pub const HTML: &str = r#"<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$name$</title>
    <style>
      :root {
        margin: 0;
        padding: 0;
        background-color: #263238;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      body {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;
      }
    </style>
  </head>
  <body>
    $content$
  </body>
</html>
"#;