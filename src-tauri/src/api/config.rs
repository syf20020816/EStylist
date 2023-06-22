//! 作用于Settings的API
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```
use serde::{Serialize, Deserialize};
use super::{CONF_DIR, CONF_FILE, TEMPLATE_DIR};
use std::fs::write;
use std::path::Path;

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Settings {
    store: String,
    template: String,
    auto: bool,
    proportion: String,
    language: Language,
    email: String,
    password: String,
    smtp:String,
    contacts: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub enum Language {
    Chinese,
    English,
}

impl Default for Settings {
    fn default() -> Self {
        Settings {
            store: format!("./{}/{}.json", CONF_DIR, CONF_FILE),
            template: format!("./{}", TEMPLATE_DIR),
            auto: false,
            proportion: "13:7".to_string(),
            language: Language::Chinese,
            email: "".to_string(),
            password: "".to_string(),
            smtp: "".to_string(),
            contacts: vec![],
        }
    }
}

///  From string -> struct (serde)
impl From<String> for Settings {
    fn from(value: String) -> Self {
        let res = serde_json::from_str(&value).unwrap_or(Settings::default());
        res
    }
}

impl Settings {
    pub fn new() -> Self {
        Settings::default()
    }
    fn get_store(&self) -> &str {
        &self.store
    }
    pub fn get_template(&self) -> &str { &self.template }
    pub fn push_contact(&mut self, contact: &str) {
        self.contacts.push(contact.to_string())
    }
    pub fn pop_contact(&mut self, contact: &str) {
        self.contacts.retain(|x| x.ne(contact))
    }
    pub fn get_password(&self)->&str{
        &self.password
    }
    pub fn get_smtp(&self)->&str{
        &self.smtp
    }
    pub fn store_config(&self) {
        // Settings -> Json
        let json_str = serde_json::to_string_pretty(&self.clone()).unwrap();
        // store in conf dir
        let conf_path = Path::new(self.get_store());
        let _ = write(conf_path, json_str);
    }
}