import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import s from "../../components/LKavtorMain/LKMain.module.css";
import React, { useEffect, useState } from "react";
import search from "../../assets/icons/search.svg";
import Loader from "../../components/Loader/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTzOfUser } from "./profile_slice";
import ProfilePagination from "../../Pagination/ProfilePagination";
import Footer from "../../components/Footer/Footer";
import ProfileListItem from "./ProfileListItem";
import { clearPdfStates } from "../../redux/api/user/pdf_slice";

export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //searchPanel
  const [searchText, setSearchText] = useState("");

  const { tzList, loading, deletedTz, deleteLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  const { duplicatedTz, duplicateLoading } = useSelector(
    (state) => state.lkavtor
  );

  const { pdf, pdfLoading } = useSelector((state) => state.pdf);

  useEffect(() => {
    dispatch(fetchAllTzOfUser({ tz_name: searchText }));

    //eslint-disable-next-line
  }, [deletedTz, searchText, duplicatedTz]);

  useEffect(() => {
    if (pdf.pdf_file) {
      window.open(pdf?.pdf_file, "_blank", "rel=noopener noreferrer");
      dispatch(clearPdfStates());
    }
    //eslint-disable-next-line
  }, [pdf]);

  return (
    <>
      {(loading && !tzList?.links) ||
      deleteLoading ||
      duplicateLoading ||
      pdfLoading ? (
        <Loader />
      ) : (
        <>
          <UserNav />
          <section className={s.lkmain_sect}>
            <div className={s.lkmain_sect_container}>
              <h1>{t("lkavtor")}</h1>
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
                      type="text"
                      placeholder={t("content-site.3")}
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                    />
                  </div>
                </div>
              </div>
              {tzList?.count > 0 ? (
                <>
                  <div className={s.org_name_div}>
                    <h4>
                      {`${t("count")}:  `}
                      {tzList?.count}
                    </h4>
                  </div>
                  <TableContainer component={Paper} classes={{ root: s.table }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <p>№</p>
                          </TableCell>
                          <TableCell align="left">
                            <p>{t("lkavtor10")}</p>
                          </TableCell>
                          <TableCell align="left">
                            {" "}
                            <p>{t("lkavtor2")}</p>
                          </TableCell>
                          <TableCell align="left">
                            {" "}
                            <p>{t("lkavtor3")}</p>
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <p>{t("lkavtor4")}</p>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody classes={{ root: s.tbody_root }}>
                        {tzList?.results?.map((tz, index) => (
                          <ProfileListItem key={tz?.id} tz={tz} index={index} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                  <br />
                  <div className={s.content_pagination}>
                    <ProfilePagination
                      superTz={tzList?.total_pages}
                      tz_name={searchText}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1 className={s.notFound}>{t("toast404")}</h1>
                </>
              )}
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
