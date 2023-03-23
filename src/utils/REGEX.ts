export const pwdRegex = {
    ATLEAST_ONE_SPECIAL_CHARACTER_REGEX: new RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/),
    LOWER_AND_UPPER_CHARACTER_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z]).+$/),
    ATLEAST_ONE_NUMBER_REGEX: new RegExp(/\d/),
    NUM_8_TO_24_CHARACTERS_REGEX: new RegExp(/^.{8,24}$/),
}

export const emailRegex = {
    AN_AT_SYMBOL_REGEX: new RegExp(/@/),
    NO_SPECIAL_CHARACTERS_EXCEPT_FOR_DOT_UNDERSCORE_REGEX: new RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/),
    START_WITH_A_LETTER_OR_NUMBER_AND_DOT_AND_DASH_REGEX: new RegExp(/^[0-9a-zA-Z]/),
    CONTAIN_DOMAIN_EXTENSION_REGEX: new RegExp(/\.[A-Za-z]{2,}$/),
}
