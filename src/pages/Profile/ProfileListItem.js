import { useTranslation } from "react-i18next";
import s from "../../components/LKavtorMain/LKMain.module.css";
import React, { useState } from "react";
import date from "../../assets/icons/dateIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { deleteTz } from "./profile_slice";
import { setRowNumberForTz } from "../../helpers/helpers";
import copyIcon from "../../assets/icons/copyIcon.svg";
import { duplicateTz } from "../LKavtor/lkavtor_slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 0,
  p: 4,
};

export default function ProfileListItem({ tz, index }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { tzList } = useSelector((state) => state.profile);

  //modal
  const [openProfileDel, setOpenProfileDel] = useState(false);
  const handleOpenProfileDel = () => setOpenProfileDel(true);
  const handleCloseProfileDel = () => setOpenProfileDel(false);

  return (
    <TableRow
      key={tz?.id}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell align="left">
        <p>#{setRowNumberForTz(tzList?.current_page, 8, index)}</p>
      </TableCell>
      <TableCell align="left">
        <p>{tz?.user?.username}</p>
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        <p>{tz?.tz_name}</p>
      </TableCell>
      <TableCell align="left">
        {" "}
        <span className={s.lkmain_sect_dates}>
          <img src={date} alt="" />
          <p>{tz?.created_at?.slice(0, 10)}</p>
        </span>{" "}
      </TableCell>
      <TableCell align="right">
        <div className={s.lkmain_sect_crud}>
          <button
            onClick={() => {
              dispatch(duplicateTz(tz?.id));
            }}
            className={s.lkmain_sect_crud_copy}
          >
            <img src={copyIcon} alt="Copy" />
          </button>
          <button
            className={s.lkmain_sect_crud_create}
            onClick={() => {
              navigate(`/tz/edit/${tz?.id}`);
            }}
          >
            <img src={createIcon} alt="Edit" />
          </button>
          <button className={s.lkmain_sect_crud_skacat}>
            <a rel="noopener" href={tz?.pdf_file} download target="_blank">
              <img src={skacatIcon} alt="Download" />
            </a>
          </button>
          <button className={s.lkmain_sect_crud_delete}>
            <img
              src={deleteIcon}
              alt="Delete"
              onClick={() => {
                handleOpenProfileDel();
              }}
            />
            <Modal
              slotProps={{
                backdrop: {
                  style: {
                    opacity: "0.4",
                    boxShadow: 24,
                  },
                },
              }}
              open={openProfileDel}
              onClose={handleCloseProfileDel}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form
                  style={{ textAlign: "center" }}
                  className={s.createElementForm}
                >
                  <h2>{t("sfera.3")}</h2>
                  <br />
                  <p>{t("sfera.6")}</p>
                  <br />
                  <div className={s.createElementFormBtns}>
                    {" "}
                    <button
                      type="button"
                      onClick={() => {
                        console.log(tz?.id);
                        handleCloseProfileDel();
                      }}
                      className={s.shablon_save_btn}
                    >
                      {t("btn.5")}
                    </button>
                    <button
                      type="button"
                      className={s.shablon_delete_btn}
                      onClick={() => {
                        dispatch(deleteTz(tz?.id));
                        handleCloseProfileDel();
                      }}
                    >
                      {t("btn.6")}
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
