pub mod uniclass;
pub mod public_health;

fn make_uuid() -> Result<String, Box<dyn std::error::Error>> {
  Ok(nanoid::nanoid!())
}

#[cfg(test)]
fn new_rusqlite() -> Result<rusqlite::Connection, Box<dyn std::error::Error>> {
  Ok(rusqlite::Connection::open_in_memory()?)
}

#[cfg(not(test))]
fn new_rusqlite() -> Result<rusqlite::Connection, Box<dyn std::error::Error>> {
  Ok(rusqlite::Connection::open_in_memory()?)
}

