import React, { useContext, useState } from "react";
import s from "../LKAminShablon/Shablonla.module.css";
import search from "../../assets/icons/search.svg";
import { Link, useSearchParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import backX from "../../assets/icons/backX.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";
import { useEffect } from "react";
import Select1 from "react-select";
import Loader from "../Loader/Loader";
import SamplePagination from "../../Pagination/SamplePagination";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "max-content",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  p: 2,
};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Shablonla = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const {
    sample,
    allSample,
    selectPunkt,
    getSelectPunkt,
    createSample,
    setSampleSect,
    sampleDescRu,
    setSampleDescRu,
    sampleDescUz,
    setSampleDescUz,
  } = useContext(Context);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    allSample({
      sectId: params.get("sectId") ? params.get("sectId") : "",
    }).then(() => setIsLoading(false));
    getSelectPunkt().then(() => setIsLoading(false));
  }, [params]);

  const { t } = useTranslation();

  if (isLoading) return <Loader />;
  return (
    <>
      <section className={s.templates_sect}>
        <div className={s.templates_sect_container}>
          <div className={s.templates_sect_label}>
            <h1>
              {t("shablon")} -{" "}
              <span className={s.sample_count}>№ {sample?.count}</span>
            </h1>
            <button
              onClick={handleOpen}
              className={s.templates_sect_create_btn}
            >
              <span style={{ fontSize: "25px" }}>+</span>
              <span>{t("shablon1")}</span>
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ textAlign: "end", cursor: "pointer" }}>
                  <img onClick={handleClose} src={backX} alt="" />
                </div>
                <form onSubmit={createSample} className={s.modal_parent}>
                  <h1>{t("shablon2")}</h1>
                  <p>{t("shablon3")}</p>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("shablon4")}
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Выберите пункт"
                      onChange={handleChange}
                    >
                      {selectPunkt?.results?.map((el) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              setSampleSect(el?.id);
                            }}
                            key={el?.id}
                            value={el?.name}
                          >
                            {el?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <p>{t("shablon5")}</p>
                  <p>{t("ru")}:</p>
                  <textarea
                    value={sampleDescRu}
                    onChange={(e) => setSampleDescRu(e.target.value)}
                    required
                    placeholder={t("shablon6")}
                  ></textarea>
                  <br />
                  <p>{t("uz")}:</p>
                  <textarea
                    value={sampleDescUz}
                    onChange={(e) => setSampleDescUz(e.target.value)}
                    required
                    placeholder={t("shablon6")}
                  ></textarea>
                  <div className={s.shablon_empty}></div>
                  <div className={s.shablon_btns}>
                    <button
                      type="button"
                      onClick={handleClose}
                      className={s.shablon_cancel_btn}
                    >
                      {t("btn.5")}
                    </button>
                    <button type="submit" className={s.shablon_save_btn}>
                      {t("btn.4")}
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
          <div className={s.templates_sect_label1}>
            <div className={s.input_field}>
              <img className={s.S_icon} src={search} alt="Search" />
              <input
                defaultValue={params.get("search") ? params.get("search") : ""}
                onChange={(e) => {
                  setParams({
                    search: e.target.value.trim(),
                    sectId: params.get("sectId") ? params.get("sectId") : "",
                    page: params.get("page") ? params.get("page") : 1,
                  });
                }}
                type="text"
                placeholder={t("spra5")}
              />
            </div>
            <div>
              <Select1
                styles={{
                  placeholder: (base) => ({
                    ...base,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }),
                }}
                placeholder={
                  [{ id: "", name: t("struc5") }]
                    .concat(selectPunkt?.results)
                    .find((el) => el?.id === params.get("sectId"))?.name
                    ? [{ id: "", name: t("struc5") }]
                        .concat(selectPunkt?.results)
                        .find((el) => el?.id === params.get("sectId"))?.name
                    : t("struc5")
                }
                onChange={(value) => {
                  setParams({
                    ...params,
                    sectId: value.value,
                    search: params.get("search") ? params.get("search") : "",
                    page: params.get("page") ? params.get("page") : 1,
                  });
                }}
                className={s.sample_select}
                options={[{ id: "", name: t("filter.1") }]
                  .concat(selectPunkt?.results)
                  .map((el) => ({
                    value: el?.id,
                    label: el?.name,
                  }))}
              />
            </div>
          </div>
          {sample?.count > 0 ? (
            <div className={s.templates_sect_parent}>
              {sample?.results?.map((el) => {
                return (
                  <Link to={`/templatePunkt/${el.id}`} key={el.id}>
                    <Fade top cascade>
                      <div className={s.templates_sect_parent_card}>
                        <span
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#222",
                          }}
                        >
                          <h1>
                            {t("struc5")} {el.section}
                          </h1>
                          <b>...</b>
                        </span>
                        <br />
                        {el?.description?.length > 250 ? (
                          <p>
                            {el?.description?.slice(0, 250)}
                            {"..."}
                          </p>
                        ) : (
                          <p>{el?.description}</p>
                        )}
                      </div>
                    </Fade>
                  </Link>
                );
              })}
            </div>
          ) : (
            <>
              <br />
              <h2 className={s.notFound} style={{ textAlign: "center" }}>
                {t("toast404")}
              </h2>
            </>
          )}
          <br />
          <br />
          <div className={s.spra_pagination}>
            <SamplePagination sample={sample?.total_pages} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Shablonla;
