CREATE UNIQUE INDEX ux_companies_name_status
ON companies (lower(name), status);
