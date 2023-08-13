pub enum TableType {
  Activities,
  Complexes,
  Entities,
  SpacesLocations,
  ElementsFunctions,
  Systems,
  Products,
  ToolsAndEquipment,
  ProjectManagement,
  FormOfInformation,
  Roles,
  Materials,
  PropertiesAndCharacteristics,
  CAD,
}

impl TryFrom<&str> for TableType {
  type Error = Box<dyn std::error::Error>;
  fn try_from(v: &str) -> Result<Self, Self::Error> {
    match v {
      "Ac" => Ok(TableType::Activities),
      "Co" => Ok(TableType::Complexes),
      "En" => Ok(TableType::Entities),
      "SL" => Ok(TableType::SpacesLocations),
      "EF" => Ok(TableType::ElementsFunctions),
      "Ss" => Ok(TableType::Systems),
      "Pr" => Ok(TableType::Products),
      "TE" => Ok(TableType::ToolsAndEquipment),
      "PM" => Ok(TableType::ProjectManagement),
      "FI" => Ok(TableType::FormOfInformation),
      "Ro" => Ok(TableType::Roles),
      "Ma" => Ok(TableType::Materials),
      "PC" => Ok(TableType::PropertiesAndCharacteristics),
      "Zz" => Ok(TableType::CAD),
      _ => Err(format!("Table code {v} is not supported").into()),
    }
  }
}

pub struct Uniclass {
  code: String,
  table: TableType,
  group: String,
  sub_group: Option<String>,
  section: Option<String>,
  title: String,
}

impl Uniclass {
  pub fn code(&self) -> &str { self.code.as_str() }
  pub fn table(&self) -> &TableType { &self.table }
  pub fn group(&self) -> &str { self.group.as_str() }
  pub fn sub_group(&self) -> &Option<String> { &self.sub_group }
  pub fn section(&self) -> &Option<String> { &self.section }
  pub fn title(&self) -> &str { self.title.as_str() }
}

impl Uniclass {
  pub fn try_from_code_title(code: &str, title: &str) -> Result<Uniclass, Box<dyn std::error::Error>> {
    let type_group                  = regex::Regex::new(r"^(?P<table_type>[[:alpha:]]{2})_(?P<group>[0-9]{2})$")?;
    let type_group_subgroup         = regex::Regex::new(r"^(?P<table_type>[[:alpha:]]{2})_(?P<group>[0-9]{2})_(?P<sub_group>[0-9]{2})$")?;
    let type_group_subgroup_section = regex::Regex::new(r"^(?P<table_type>[[:alpha:]]{2})_(?P<group>[0-9]{2})_(?P<sub_group>[0-9]{2})_(?P<section>[0-9]{2})$")?;
    if let Some(c) = type_group.captures(code) {
      Ok(Uniclass { 
        code: code.to_string(), 
        table: c.name("table_type").ok_or("Incorrect regex for table_type")?.as_str().try_into()?,
        group: c.name("group").ok_or("Incorrect regex for group")?.as_str().to_string(),
        sub_group: None,
        section: None,
        title: title.to_string(),
      })

    } else if let Some(c) = type_group_subgroup.captures(code) {
      Ok(Uniclass { 
        code: code.to_string(), 
        table: c.name("table_type").ok_or("Incorrect regex for table_type")?.as_str().try_into()?,
        group: c.name("group").ok_or("Incorrect regex for group")?.as_str().to_string(),
        sub_group: Some(c.name("sub_group").ok_or("Incorrect regex for sub_group")?.as_str().to_string()),
        section: None,
        title: title.to_string(),
      })

    } else if let Some(c) = type_group_subgroup_section.captures(code) {
      Ok(Uniclass { 
        code: code.to_string(), 
        table: c.name("table_type").ok_or("Incorrect regex for table_type")?.as_str().try_into()?,
        group: c.name("group").ok_or("Incorrect regex for group")?.as_str().to_string(),
        sub_group: Some(c.name("sub_group").ok_or("Incorrect regex for sub_group")?.as_str().to_string()),
        section: Some(c.name("section").ok_or("Incorrect regex for section")?.as_str().to_string()),
        title: title.to_string(),
      })

    } else {
      Err(format!("Unable to match code {code}").as_str().into())
    }
  }
}

#[cfg(test)]
mod uniclass {
  use super::*;

  #[test]
  fn it_parses_code() -> Result<(), Box<dyn std::error::Error>> {
    let r = Uniclass::try_from_code_title("Co_20", "Administrative, commercial and protective service complexes")?;
    assert!(matches!(r.table(), TableType::Complexes));
    assert!(r.group().eq("20"));
    assert!(r.sub_group().is_none());
    assert!(r.section().is_none());
    assert!(r.title().eq("Administrative, commercial and protective service complexes"));

    assert!(Uniclass::try_from_code_title("Co_20_10", "title")?.sub_group().as_ref().unwrap().eq("10"));
    assert!(Uniclass::try_from_code_title("Co_20_10_60", "title")?.section().as_ref().unwrap().eq("60"));
    assert!(Uniclass::try_from_code_title("Co_20_15_58", "title")?.section().as_ref().unwrap().eq("58"));

    assert!(Uniclass::try_from_code_title("C_20_15_58", "title").is_err());

    Ok(())
  }
}
