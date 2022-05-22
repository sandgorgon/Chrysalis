// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import { useTranslation } from "react-i18next";

import TextField from "@mui/material/TextField";

const EditInterval = (props) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t("editor.macros.steps.INTERVAL")}
      type="number"
      value={props.value}
      onChange={props.onChange}
      InputLabelProps={{
        shrink: true,
      }}
      helperText={t("editor.macros.steps.in_ms")}
    />
  );
};

export default EditInterval;
