//! Init Service
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```
use std::fs::{create_dir, File, read_to_string, write};
use std::path::{Path};
use serde::{Serialize, Deserialize};
use super::{Settings, CONF_DIR, CONF_FILE, TEMPLATE_DIR, DOC_DIR, DOC_FILE, DOC_DOWNLOAD_URL, README, README_CONTENT,COMPONENT_DIR};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Init {
    default_path: String,
    conf_path: String,
    conf_name: String,
    conf_type: String,
    components_path:String,
    templates_path: String,
    templates_type: String,
    templates_data_type: String,
    doc_path: String,
    doc_name: String,
    common_type: String,
    repository: String,
}


impl Default for Init {
    fn default() -> Self {
        Init {
            default_path: ".".to_string(),
            conf_path: CONF_DIR.to_string(),
            conf_name: CONF_FILE.to_string(),
            conf_type: "json".to_string(),
            components_path: COMPONENT_DIR.to_string(),
            templates_path: TEMPLATE_DIR.to_string(),
            templates_type: "html".to_string(),
            templates_data_type: "json".to_string(),
            doc_path: DOC_DIR.to_string(),
            doc_name: DOC_FILE.to_string(),
            common_type: "txt".to_string(),
            repository: "https://github.com/syf20020816/EStylist".to_string(),
        }
    }
}

impl Init {
    pub fn new() -> Self {
        Init::default()
    }
    fn get_default_path(&self) -> &str {
        &self.default_path
    }
    fn get_conf_path(&self) -> &str { &self.conf_path }
    fn get_conf_name(&self) -> &str { &self.conf_name }
    fn get_conf_type(&self) -> &str { &self.conf_type }
    fn get_templates_path(&self) -> &str { &self.templates_path }
    fn get_components_path(&self) -> &str { &self.components_path }
    fn get_templates_type(&self) -> &str { &self.templates_type }
    fn get_templates_data_type(&self) -> &str { &self.templates_data_type }
    fn get_doc_path(&self) -> &str { &self.doc_path }
    fn get_doc_name(&self) -> &str { &self.doc_name }
    fn get_common_type(&self) -> &str { &self.common_type }
    /// p_type is empty -> dir
    /// p_type not empty -> file
    fn build_path(&self, parent: &str, dir: &str, name: &str, p_type: &str) -> String {
        // dir
        if name.is_empty() {
            return format!("{}/{}", parent, dir);
        }
        format!("{}/{}/{}.{}", parent, dir, name, p_type)
    }
    fn create_item(&self, path: &Path, is_file: bool) {
        if !path.try_exists().unwrap() {
            if !is_file {
                let _ = create_dir(path);
            } else {
                let _ = File::create(path);
            }
        }
    }

    /// init files , dirs
    pub fn init_all(&self) {
        //init conf
        let conf_dir_str = self.build_path(self.get_default_path(), self.get_conf_path(), "", "");
        let conf_dir_path = Path::new(&conf_dir_str);
        self.create_item(conf_dir_path, false);
        let conf_file_str = self.build_path(self.get_default_path(), self.get_conf_path(), self.get_conf_name(), self.get_conf_type());
        self.create_item(Path::new(&conf_file_str), true);
        // write config
        let mut conf = Settings::new();
        conf.store_config();
        //init templates
        let template_dir_str = self.build_path(self.get_default_path(), self.get_templates_path(), "", "");
        let template_dir_path = Path::new(&template_dir_str);
        self.create_item(template_dir_path, false);
        //init components
        let component_dir_str = self.build_path(self.get_default_path(), self.get_components_path(), "", "");
        let component_dir_path = Path::new(&component_dir_str);
        self.create_item(component_dir_path, false);
        //init doc
        let doc_dir_str = self.build_path(self.get_default_path(), self.get_doc_path(), "", "");
        let doc_dir_path = Path::new(&doc_dir_str);
        self.create_item(doc_dir_path, false);
        let doc_file_str = self.build_path(self.get_default_path(), self.get_doc_path(), self.get_doc_path(), self.get_common_type());
        self.create_item(Path::new(&doc_file_str), true);
        let _ = write(Path::new(&doc_file_str), DOC_DOWNLOAD_URL);
        //init readme
        let readme_file_str = format!("{}/{}.{}", self.get_default_path(), README, self.get_common_type());
        self.create_item(Path::new(&readme_file_str), true);
        let mut content = String::new();
        for s in README_CONTENT {
            content.push_str(s);
            content.push_str("\n");
            content.push_str("\n");
        }
        let _ = write(Path::new(&readme_file_str), &content);
    }
    /// json file -> Settings struct
    pub fn get_config_settings(&self) -> Settings {
        let tmp = format!("./{}/{}.json", CONF_DIR, CONF_FILE);
        let config_path = Path::new(&tmp);
        let config_str = read_to_string(config_path).unwrap();
        let settings: Settings = config_str.into();
        settings
    }
}