use super::*;

#[derive(Clone)]
#[derive(serde::Serialize, serde::Deserialize)]
pub enum UnitType {
  Bedroom,
  BedSpace,
  Inmate,
  Person,
  Pupil,
  Bed,
  Cover,
}

impl rusqlite::types::FromSql for UnitType {
  fn column_result(value: rusqlite::types::ValueRef<'_>) -> rusqlite::types::FromSqlResult<UnitType> {
    Ok(serde_json::from_str(value.as_str()?).map_err(|e| rusqlite::types::FromSqlError::Other(Box::new(e)))?)
  }
}

impl rusqlite::types::ToSql for UnitType {
  fn to_sql(&self) -> rusqlite::Result<rusqlite::types::ToSqlOutput<'_>> {
    let s = serde_json::to_string(&self).map_err(|e| rusqlite::Error::ToSqlConversionFailure(Box::new(e)))?;
    Ok(s.into())
  }
}

#[derive(derive_sql::DeriveSql)]
#[cfg_attr(feature = "cli", derive_sql(rusqlite_connection = "new_rusqlite"))]
pub struct CipheDailyWaterDemand {
  #[derive_sql(primary_key, on_insert = "make_uuid")]
  uuid: String,
  building_type: String,
  demand_in_litres_per_unit: f32,
  #[derive_sql(serialize)]
  unit_type: UnitType,
}

impl CipheDailyWaterDemand {
  fn new(building_type: &str, demand_in_litres_per_unit: f32, unit_type: UnitType) -> CipheDailyWaterDemand {
    CipheDailyWaterDemand {
      uuid: "".to_string(),
      building_type: building_type.to_string(),
      demand_in_litres_per_unit,
      unit_type,
    }
  }

  pub fn populate() -> Result<(), Box<dyn std::error::Error>> {
  /*
    Ok(vec![
      CipheDailyWaterDemand::new("Dwellings / 2 bedroom",         130, UnitType::Bedroom),
      CipheDailyWaterDemand::new("Dwellings / 3+ bedrooms",       100, UnitType::Bedroom),
      CipheDailyWaterDemand::new("Dwellings / Student en-suite",  100, UnitType::Bedroom),
      CipheDailyWaterDemand::new("Dwellings / Student, communal",  90, UnitType::BedSpace),
      CipheDailyWaterDemand::new("Dwellings / Nurses Home",       120, UnitType::BedSpace),
      CipheDailyWaterDemand::new("Dwellings / Children's Home",   135, UnitType::BedSpace),
      CipheDailyWaterDemand::new("Dwellings / Elderly sheltered", 135, UnitType::BedSpace),
      CipheDailyWaterDemand::new("Dwellings / Elderly Care Home", 135, UnitType::BedSpace),
    ])
      CipheDailyWaterDemand::new("Dwellings / 1 bedroom",         210, UnitType::Bedroom),
    */

    Ok(())
  }
}

pub struct UniclassToCipheDailyWaterDemand {
  uniclass_code: String,
  ciphe_daily_water_demand_uuid: String,
}

