create schema server_esp_32;

create table device_control(
  id serial primary key,
  name text not null,
  dateTime timestamp now()
)

-- add status to know if is ON or OFF