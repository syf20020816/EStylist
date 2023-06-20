//! 作用于Settings的API
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Settings {
    store: String,
    template: String,
    auto: bool,
    proportion: String,
    language: Language,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub enum Language {
    Chinese,
    English,
}

impl Default for Settings {
    fn default() -> Self {
        Settings {
            store: "".to_string(),
            template: "".to_string(),
            auto: false,
            proportion: "13:7".to_string(),
            language: Language::Chinese,
        }
    }
}

///  From string -> struct (serde)
impl From<&str> for Settings {
    fn from(value: &str) -> Self {
        let res = serde_json::from_str(value).unwrap_or(Settings::default());
        res
    }
}

impl Settings {
    fn new() -> Self {
        Settings::default()
    }
    // fn store_config(&self) -> Result<bool, Box<&'static str>> {
    //     // Settings -> Json
    //     let json_str = serde_json::to_string_pretty(&self.clone()).unwrap();
    //     // store in conf dir
    //
    // }
}