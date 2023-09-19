import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import s from "../OrganizationsComp/organizations.module.css";
import search from "../../assets/icons/search.svg";
import { Context } from "../../Context/Context";
import Loader from "../Loader/Loader";
import OrgPagination from "../../Pagination/OrgPagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEye } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

const OrganizationsComp = () => {
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { SuperOrganizations, organization } = useContext(Context);
  const { t } = useTranslation();

  const optionOwner = [
    { value: true, label: t("super.2") },
    { value: false, label: t("filter.1") },
  ];

  useEffect(() => {
    SuperOrganizations({
      own: params.get("own") ? params.get("own") : "",
    }).then(() => setIsLoading(false));
  }, [params]);

  if (isLoading) return <Loader />;

  return (
    <>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <div className={s.lkmain_sect_labels}>
            <h1>{t("super.1")}</h1>
          </div>
          <br />
          <div className={s.lkmain_sect_labels}>
            <div
              style={{
                width: "35%",
                display: "flex",
                height: "60px",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className={s.input_field}>
                <img className={s.S_icon} src={search} alt="Search" />
                <input
                  defaultValue={
                    params.get("searchorg") ? params.get("searchorg") : ""
                  }
                  onChange={(e) =>
                    setParams({
                      searchorg: e.target.value.trim(),
                      own: params.get("own") ? params.get("own") : "",
                      page: params.get("page") ? params.get("page") : 1,
                    })
                  }
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
              <div>
                <Select
                  placeholder={params.get("own") ? t("super.2") : t("filter.1")}
                  onChange={(value) => {
                    setParams({
                      ...params,
                      own: value.value,
                      searchorg: params.get("searchorg")
                        ? params.get("searchorg")
                        : "",
                      page: params.get("page") ? params.get("page") : 1,
                    });
                  }}
                  className={s.selecttt}
                  options={optionOwner}
                />
              </div>
            </div>
          </div>
          <br />
          {organization?.results?.length ? (
            <TableContainer component={Paper} classes={{ root: s.table }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>№ </TableCell>
                    <TableCell align="left">{t("super.3")}</TableCell>
                    <TableCell align="center">{t("super.4")}</TableCell>
                    <TableCell align="center">{t("super.5")}</TableCell>
                    <TableCell align="right">{t("super.6")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody classes={{ root: s.tbody_root }}>
                  {organization?.results?.map((org) => (
                    <TableRow
                      key={org?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">
                        {org?.row_number}
                        {"."}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {org?.name}
                      </TableCell>
                      <TableCell align="center">{org?.total_result}</TableCell>
                      <TableCell align="center">{org?.count_of_user}</TableCell>
                      <TableCell align="right">
                        <Link to={`/organizations/${org?.id}`}>
                          <button className={s.lkmain_sect_crud_create}>
                            <FaEye
                              style={{
                                color: "#2f80ed",
                                fontSize: "16px",
                              }}
                            />
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <h1 className={s.notFound}>{t("toast404")}</h1>
            </>
          )}
          <br />
          <div className={s.content_pagination}>
            <OrgPagination organization={organization?.total_pages} />
          </div>
        </div>
      </section>
    </>
  );
};

export default OrganizationsComp;
