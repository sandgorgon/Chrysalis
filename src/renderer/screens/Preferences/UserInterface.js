// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Store = require("electron-store");
const settings = new Store();

function UserInterfacePreferences(props) {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const globalContext = React.useContext(GlobalContext);

  const [darkMode, setDarkMode] = globalContext.state.darkMode;
  const [coloredLayoutCards, setColoredLayoutCards] = useState(false);
  const [hideUnavailableFeatures, setHideUnavailableFeatures] = useState(true);

  const toggleDarkMode = async () => {
    settings.set("ui.darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  const toggleColoredLayoutCards = () => {
    settings.set("ui.layoutCards.colored", !coloredLayoutCards);
    setColoredLayoutCards(!coloredLayoutCards);
  };

  const toggleHideUnavailableFeatures = () => {
    settings.set(
      "ui.hideFeaturesNotAvailableInCurrentFirmware",
      !hideUnavailableFeatures
    );
    setHideUnavailableFeatures(!hideUnavailableFeatures);
  };

  const updateLanguage = async (event) => {
    i18n.changeLanguage(event.target.value);
    await settings.set("ui.language", event.target.value);
    // We stick language in the state system to get rerenders when it changes
    if (i18n.language !== event.target.value) {
      setLanguage(event.target.value);
    }
  };

  useEffect(() => {
    setColoredLayoutCards(settings.get("ui.layoutCards.colored"));

    const hideUnavail = settings.get(
      "ui.hideFeaturesNotAvailableInCurrentFirmware",
      true
    );
    setHideUnavailableFeatures(hideUnavail);
  });

  const languages = Object.keys(i18n.options.resources).map((code) => {
    const t = i18n.getFixedT(code);
    return (
      <MenuItem value={code} key={code}>
        {t("language")}
      </MenuItem>
    );
  });

  return (
    <>
      <FormControl variant="standard" fullWidth={true}>
        <InputLabel>{t("preferences.language")}</InputLabel>
        <Select
          value={language}
          sx={{ mb: 2 }}
          onChange={updateLanguage}
          label={t("preferences.language")}
          input={<FilledInput sx={{}} />}
        >
          {languages}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            value="devtools"
            sx={{ mx: 3 }}
          />
        }
        sx={{ display: "flex", marginRight: 2 }}
        labelPlacement="end"
        label={t("preferences.darkMode")}
      />
      <FormControlLabel
        control={
          <Switch
            checked={coloredLayoutCards}
            onChange={toggleColoredLayoutCards}
            sx={{ mx: 3 }}
          />
        }
        sx={{ display: "flex", marginRight: 2 }}
        labelPlacement="end"
        label={t("preferences.coloredLayoutCards")}
      />
      <FormControlLabel
        control={
          <Switch
            checked={hideUnavailableFeatures}
            onChange={toggleHideUnavailableFeatures}
            sx={{ mx: 3 }}
          />
        }
        sx={{ display: "flex", marginRight: 2 }}
        labelPlacement="end"
        label={t("preferences.hideUnavailableFeatures.label")}
      />
      <FormHelperText sx={{ mx: 3 }}>
        {t("preferences.hideUnavailableFeatures.help")}
      </FormHelperText>
    </>
  );
}

export { UserInterfacePreferences };