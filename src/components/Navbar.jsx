import { Box, Flex, Spacer, Heading, Button, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useAuth } from "../contexts/Auth.context";
import HasAccess from "./HasAcces";

import { useMemo, useCallback } from "react";

import { useLanguage } from "../contexts/Language.context";

import translations from "../translation/translation";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Link>
      {colorMode === "light" ? (
        <MoonIcon onClick={toggleColorMode} />
      ) : (
        <SunIcon onClick={toggleColorMode} />
      )}
    </Link>
  );
};

export default function Navbar() {
  const { isAuthed } = useAuth();
  const { language, changeLanguage } = useLanguage();

  const linkLanguageStyleEn = useMemo(() => {
    return language === "en" ? "blue.500" : "";
  }, [language]);

  const linkLanguageStyleNl = useMemo(() => {
    return language === "nl" ? "blue.500" : "";
  }, [language]);

  const handelChangeLanguage = useCallback(
    (lang) => {
      changeLanguage(lang);
    },
    [changeLanguage]
  );

  return (
    <Flex m={5} minWidth="max-content" alignItems="center" gap="1">
      <Box>
        <Heading
          size="md"
          bgGradient="linear(to-r,  blue.500,pink.200,)"
          bgClip="text"
        >
          <NavLink to="/">Movie App</NavLink>
        </Heading>
      </Box>

      <Box p="2" ml="5">
        <NavLink to="/movies"> {translations[language].movies}</NavLink>
      </Box>

      <Box p="2">
        <NavLink to="/reviews">{translations[language].reviews}</NavLink>
      </Box>

      <HasAccess>
        <Box p="2">
          <NavLink to="/movies/add">{translations[language].addMovie}</NavLink>
        </Box>
      </HasAccess>
      <Spacer />

      <Box>
        <Link
          onClick={() => handelChangeLanguage("nl")}
          color={linkLanguageStyleNl}
        >
          nl
        </Link>
      </Box>
      <Box pr="1">
        <Link
          onClick={() => handelChangeLanguage("en")}
          color={linkLanguageStyleEn}
        >
          en
        </Link>
      </Box>
      <ThemeToggle />

      {isAuthed ? (
        <Box p="2" display="flex" alignItems="center">
          <NavLink data-cy="logout_btn" className="nav-link" to="/logout">
            {translations[language].logout}
          </NavLink>
        </Box>
      ) : (
        <>
          <Box p="2" display="flex" alignItems="center">
            <NavLink className="nav-link" to="/login">
              {translations[language].login}
            </NavLink>
          </Box>
          <Box p="2">
            <NavLink className="nav-link" to="/register">
              {translations[language].register}
            </NavLink>
          </Box>
        </>
      )}
    </Flex>
  );
}
