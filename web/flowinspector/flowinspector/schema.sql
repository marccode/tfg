drop table if exists traces;
create table traces (
  id integer primary key autoincrement,
  protocol integer not null,
  src_port integer not null,
  dest_port integer not null,
  packets integer not null,
  bytes integer not null,
  start_time real not null,
  end_time real not null,
  duration real not null,
  bytes_pkts integer not null,
  tos integer not null,
  urg integer not null,
  ack integer not null,
  psh integer not null,
  rst integer not null,
  syn integer not null,
  fin integer not null,
  application text not null,
  prediction text not null,
);

# AFEGIR TAMBE DATA