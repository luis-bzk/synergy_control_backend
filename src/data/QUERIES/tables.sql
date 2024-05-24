CREATE DATABASE SYNERGY_CONTROL;

\C SYNERGY_CONTROL;

CREATE SCHEMA CORE;

CREATE TABLE CORE.CORE_COUNTRY
(
    COU_ID            SERIAL PRIMARY KEY,
    COU_NAME          VARCHAR(100) NOT NULL,
    COU_CODE          VARCHAR(10)  NOT NULL,
    COU_PREFIX        VARCHAR(10)  NOT NULL,
    COU_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    COU_RECORD_STATUS VARCHAR(1)   NOT NULL
);

CREATE TABLE CORE.CORE_PROVINCE
(
    PRO_ID            SERIAL PRIMARY KEY,
    PRO_NAME          VARCHAR(100) NOT NULL,
    PRO_CODE          VARCHAR(10)  NOT NULL,
    ID_COUNTRY        INT          NOT NULL,
    PRO_PREFIX        VARCHAR(10)  NOT NULL,
    PRO_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRO_RECORD_STATUS VARCHAR(1)   NOT NULL,
    CONSTRAINT FK1_CORE_PROVINCE FOREIGN KEY (ID_COUNTRY) REFERENCES CORE.CORE_COUNTRY (COU_ID)
);

CREATE TABLE CORE.CORE_CITY
(
    CIT_ID            SERIAL PRIMARY KEY,
    CIT_NAME          VARCHAR(100) NOT NULL,
    ID_PROVINCE       INT          NOT NULL,
    CIT_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CIT_RECORD_STATUS VARCHAR(1)   NOT NULL,
    CONSTRAINT FK1_CORE_PROVINCE FOREIGN KEY (ID_PROVINCE) REFERENCES CORE.CORE_PROVINCE (PRO_ID)
);

CREATE TABLE CORE.CORE_USER
(
    USE_ID            SERIAL PRIMARY KEY,
    USE_NAME          VARCHAR(100)        NOT NULL,
    USE_LAST_NAME     VARCHAR(100)        NOT NULL,
    USE_EMAIL         VARCHAR(100) UNIQUE NOT NULL,
    USE_PASSWORD      VARCHAR(100)        NOT NULL,
    USE_TOKEN         VARCHAR(60),
    USE_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    USE_RECORD_STATUS VARCHAR(1)          NOT NULL
);

CREATE TABLE CORE.CORE_ROLE
(
    ROL_ID            SERIAL PRIMARY KEY,
    ROL_NAME          VARCHAR(100) NOT NULL,
    ROL_DESCRIPTION   VARCHAR(200),
    ROL_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ROL_RECORD_STATUS VARCHAR(1)   NOT NULL
);

CREATE TABLE CORE.CORE_USER_ROLE
(
    URO_ID            SERIAL PRIMARY KEY,
    ID_USER           INT        NOT NULL,
    ID_ROLE           INT        NOT NULL,
    URO_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    URO_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_USER_ROLE FOREIGN KEY (ID_USER) REFERENCES CORE.CORE_USER (USE_ID),
    CONSTRAINT FK2_CORE_USER_ROLE FOREIGN KEY (ID_ROLE) REFERENCES CORE.CORE_ROLE (ROL_ID)
);

CREATE TABLE CORE.CORE_GENRE
(
    GEN_ID            SERIAL PRIMARY KEY,
    GEN_NAME          VARCHAR(50),
    GEN_DESCRIPTION   VARCHAR(100),
    GEN_ABBREVIATION  VARCHAR(10),
    GEN_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    GEN_RECORD_STATUS VARCHAR(1) NOT NULL
);

CREATE TABLE CORE.CORE_IDENTIFICATION_TYPE
(
    ITY_ID            SERIAL PRIMARY KEY,
    ITY_NAME          VARCHAR(50),
    ITY_DESCRIPTION   VARCHAR(100),
    ITY_ABBREVIATION  VARCHAR(10),
    ID_COUNTRY        INT        NOT NULL,
    ITY_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ITY_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_IDENTIFICATION_TYPE FOREIGN KEY (ID_COUNTRY) REFERENCES CORE.CORE_COUNTRY (COU_ID)
);

CREATE TABLE CORE.CORE_PERSON
(
    PER_ID                    SERIAL PRIMARY KEY,
    ID_IDENTIFICATION_TYPE    INT         NOT NULL,
    ID_USER                   INT         NOT NULL,
    ID_GENRE                  INT         NOT NULL,
    PER_IDENTIFICATION_NUMBER VARCHAR(50) NOT NULL,
    PER_FIRST_NAME            VARCHAR(50),
    PER_SECOND_NAME           VARCHAR(50),
    PER_FIRST_LAST_NAME       VARCHAR(50),
    PER_SECOND_LAST_NAME      VARCHAR(50),
    PER_OCCUPATION            VARCHAR(100),
    PER_CREATED_DATE          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PER_RECORD_STATUS         VARCHAR(1)  NOT NULL,
    CONSTRAINT FK1_CORE_PERSON FOREIGN KEY (ID_USER) REFERENCES CORE.CORE_USER (USE_ID),
    CONSTRAINT FK2_CORE_PERSON FOREIGN KEY (ID_IDENTIFICATION_TYPE) REFERENCES CORE.CORE_IDENTIFICATION_TYPE (ITY_ID),
    CONSTRAINT FK3_CORE_PERSON FOREIGN KEY (ID_GENRE) REFERENCES CORE.CORE_GENRE (GEN_ID)
);

CREATE TABLE CORE.CORE_PHONE_TYPE
(
    PTY_ID            SERIAL PRIMARY KEY,
    PTY_NAME          VARCHAR(100) NOT NULL,
    PTY_DESCRIPTION   VARCHAR(100),
    PTY_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PTY_RECORD_STATUS VARCHAR(1)   NOT NULL
);

CREATE TABLE CORE.CORE_PHONE
(
    PHO_ID            SERIAL PRIMARY KEY,
    ID_USER           INT,
    ID_PHONE_TYPE     INT        NOT NULL,
    PHO_NUMBER        VARCHAR(30),
    PHO_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PHO_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_PHONE FOREIGN KEY (ID_USER) REFERENCES CORE.CORE_USER (USE_ID),
    CONSTRAINT FK2_CORE_PHONE FOREIGN KEY (ID_PHONE_TYPE) REFERENCES CORE.core_phone_type (PTY_ID)
);

CREATE TABLE CORE.CORE_ADDRESS
(
    ADD_ID               SERIAL PRIMARY KEY,
    ID_COUNTRY           INT        NOT NULL,
    ID_PROVINCE          INT        NOT NULL,
    ID_CITY              INT        NOT NULL,
    ID_USER              INT,
    ADD_MAIN_STREET      VARCHAR(100),
    ADD_SECONDARY_STREET VARCHAR(100),
    ADD_POSTAL_CODE      VARCHAR(20),
    ADD_REFERENCE        VARCHAR(100),
    ADD_NUMBER           INT,
    ADD_CREATED_DATE     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD_RECORD_STATUS    VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_ADDRESS FOREIGN KEY (ID_COUNTRY) REFERENCES CORE.CORE_COUNTRY (COU_ID),
    CONSTRAINT FK2_CORE_ADDRESS FOREIGN KEY (ID_PROVINCE) REFERENCES CORE.CORE_PROVINCE (PRO_ID),
    CONSTRAINT FK3_CORE_ADDRESS FOREIGN KEY (ID_CITY) REFERENCES CORE.CORE_CITY (CIT_ID),
    CONSTRAINT FK4_CORE_ADDRESS FOREIGN KEY (ID_USER) REFERENCES CORE.CORE_USER (USE_ID)
);

CREATE TABLE CORE.CORE_AGENCY
(
    AGE_ID            SERIAL PRIMARY KEY,
    ID_ADDRESS        INT        NOT NULL,
    AGE_NAME          VARCHAR(100),
    AGE_OPENING_HOUR  VARCHAR(5),
    AGE_CLOSING_HOUR  VARCHAR(5),
    AGE_PHONE         VARCHAR(30),
    AGE_EMAIL         VARCHAR(100),
    AGE_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    AGE_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_AGENCY FOREIGN KEY (ID_ADDRESS) REFERENCES CORE.CORE_ADDRESS (ADD_ID)
);

CREATE TABLE CORE.CORE_CLIENT
(
    CLI_ID            SERIAL PRIMARY KEY,
    ID_PERSON         INT        NOT NULL,
    ID_AGENCY         INT        NOT NULL,
    CLI_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CLI_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_CLIENT FOREIGN KEY (ID_PERSON) REFERENCES CORE.CORE_PERSON (PER_ID),
    CONSTRAINT FK2_CORE_CLIENT FOREIGN KEY (ID_AGENCY) REFERENCES CORE.CORE_AGENCY (AGE_ID)
);

CREATE TABLE CORE.CORE_CATEGORY
(
    CAT_ID            SERIAL PRIMARY KEY,
    CAT_NAME          VARCHAR(50),
    CAT_DESCRIPTION   VARCHAR(100),
    CAT_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CAT_RECORD_STATUS VARCHAR(1) NOT NULL
);

CREATE TABLE CORE.CORE_WAREHOUSE
(
    WAR_ID            SERIAL PRIMARY KEY,
    ID_AGENCY         INT        NOT NULL,
    ID_ADDRESS        INT        NOT NULL,
    WAR_NAME          VARCHAR(100),
    WAR_DESCRIPTION   VARCHAR(200),
    WAR_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    WAR_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_WAREOUSE FOREIGN KEY (ID_AGENCY) REFERENCES CORE.CORE_AGENCY (AGE_ID),
    CONSTRAINT FK2_CORE_WAREOUSE FOREIGN KEY (ID_ADDRESS) REFERENCES CORE.CORE_ADDRESS (ADD_ID)
);

CREATE TABLE CORE.CORE_PRODUCT
(
    PRO_ID            SERIAL PRIMARY KEY,
    ID_AGENCY         INT            NOT NULL,
    PRO_NAME          VARCHAR(100),
    PRO_DESCRIPTION   VARCHAR(250),
    PRO_BASE_PRICE    DECIMAL(10, 4) NOT NULL CHECK (PRO_BASE_PRICE >= 0),
    PRO_IVA_PRICE     DECIMAL(10, 4) NOT NULL CHECK (PRO_IVA_PRICE >= 0),
    PRO_DISCOUNT      INT            NOT NULL CHECK (PRO_DISCOUNT >= 0),
    SKU_IDENTIFIER    VARCHAR(100)   NOT NULL,
    PRO_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRO_RECORD_STATUS VARCHAR(1)     NOT NULL,
    CONSTRAINT FK1_CORE_PRODUCT FOREIGN KEY (ID_AGENCY) REFERENCES CORE.CORE_AGENCY (AGE_ID)
);

CREATE TABLE CORE.CORE_PRODUCT_DETAILS
(
    PDE_ID            SERIAL PRIMARY KEY,
    ID_PRODUCT        INT        NOT NULL,
    PDE_BAR_CODE      VARCHAR(50),
    PDE_WEIGHT        DECIMAL(10, 4),
    PDE_BRAND         VARCHAR(50),
    PDE_COLOR         VARCHAR(50),
    PDE_MATERIAL      VARCHAR(50),
    PDE_WARRANTY      VARCHAR(50),
    PDE_IMAGE         VARCHAR(200),
    PDE_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PDE_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_PRODUCT_DETAILS FOREIGN KEY (ID_PRODUCT) REFERENCES CORE.CORE_PRODUCT (PRO_ID)
);

CREATE TABLE CORE.CORE_PRODUCT_CATEGORY
(
    PCA_ID            SERIAL PRIMARY KEY,
    ID_PRODUCT        INT        NOT NULL,
    ID_CATEGORY       INT        NOT NULL,
    PCA_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PCA_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_PRODUCT_CATEGORY FOREIGN KEY (ID_PRODUCT) REFERENCES CORE.CORE_PRODUCT (PRO_ID),
    CONSTRAINT FK2_CORE_PRODUCT_CATEGORY FOREIGN KEY (ID_CATEGORY) REFERENCES CORE.CORE_CATEGORY (CAT_ID)
);

CREATE TABLE CORE.CORE_PRODUCT_INVENTORY
(
    PIN_ID            SERIAL PRIMARY KEY,
    ID_PRODUCT        INT          NOT NULL,
    SKU_IDENTIFIER    VARCHAR(100) NOT NULL,
    ID_WAREHOUSE      INT          NOT NULL,
    PIN_STOCK         INT          NOT NULL CHECK (PIN_STOCK >= 0 ),
    PIN_SOLD          INT          NOT NULL CHECK (PIN_SOLD >= 0),
    PIN_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PIN_RECORD_STATUS VARCHAR(1)   NOT NULL,
    CONSTRAINT FK1_CORE_PRODUCT_INVENTORY FOREIGN KEY (ID_PRODUCT) REFERENCES CORE.CORE_PRODUCT (PRO_ID),
    CONSTRAINT FK2_CORE_PRODUCT_INVENTORY FOREIGN KEY (ID_WAREHOUSE) REFERENCES CORE.CORE_WAREHOUSE (WAR_ID)
);

CREATE TABLE CORE.CORE_TRANSACTION_TYPE
(
    TTY_ID            SERIAL PRIMARY KEY,
    TTY_NAME          VARCHAR(100),
    TTY_DESCRIPTION   VARCHAR(200),
    TTY_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TTY_RECORD_STATUS VARCHAR(1) NOT NULL
);

CREATE TABLE CORE.CORE_POLICY
(
    POL_ID              SERIAL PRIMARY KEY,
    ID_TRANSACTION_TYPE INT        NOT NULL,
    POL_NAME            VARCHAR(100),
    POL_DESCRIPTION     VARCHAR(200),
    POL_CREATED_DATE    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    POL_RECORD_STATUS   VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_POLICY FOREIGN KEY (ID_TRANSACTION_TYPE) REFERENCES CORE.CORE_TRANSACTION_TYPE (TTY_ID)
);

CREATE TABLE CORE.CORE_AGENT
(
    AGE_ID            SERIAL PRIMARY KEY,
    ID_AGENCY         INT        NOT NULL,
    ID_USER           INT        NOT NULL,
    AGE_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    AGE_RECORD_STATUS VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_AGENT FOREIGN KEY (ID_AGENCY) REFERENCES CORE.CORE_AGENCY (AGE_ID),
    CONSTRAINT FK2_CORE_AGENT FOREIGN KEY (ID_USER) REFERENCES CORE.CORE_USER (USE_ID)
);


CREATE TABLE CORE.CORE_SALE_ORDER
(
    SOR_ID              SERIAL PRIMARY KEY,
    ID_CLIENT           INT        NOT NULL,
    ID_AGENCY           INT        NOT NULL,
    ID_TRANSACTION_TYPE INT        NOT NULL,
    ID_POLICY           INT        NOT NULL,
    ID_AGENT            INT        NOT NULL,
    SOR_SALE_DATE       TIMESTAMP  NOT NULL,
    SOR_CREATED_DATE    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    SOR_RECORD_STATUS   VARCHAR(1) NOT NULL,
    CONSTRAINT FK1_CORE_SALE_ORDER FOREIGN KEY (ID_CLIENT) REFERENCES CORE.CORE_CLIENT (CLI_ID),
    CONSTRAINT FK2_CORE_SALE_ORDER FOREIGN KEY (ID_AGENCY) REFERENCES CORE.CORE_AGENCY (AGE_ID),
    CONSTRAINT FK3_CORE_SALE_ORDER FOREIGN KEY (ID_TRANSACTION_TYPE) REFERENCES CORE.CORE_TRANSACTION_TYPE (TTY_ID),
    CONSTRAINT FK4_CORE_SALE_ORDER FOREIGN KEY (ID_POLICY) REFERENCES CORE.CORE_AGENT (AGE_ID),
    CONSTRAINT FK5_CORE_SALE_ORDER FOREIGN KEY (ID_AGENT) REFERENCES CORE.CORE_CLIENT (CLI_ID)
);

CREATE TABLE CORE.CORE_SALE_ORDER_DETAILS
(
    SOD_ID            SERIAL PRIMARY KEY,
    ID_SALE_ORDER     INT            NOT NULL,
    ID_WAREHOUSE      INT            NOT NULL,
    SKU_IDENTIFIER    VARCHAR(100)   NOT NULL,
    SOD_QUANTITY      INT            NOT NULL CHECK (SOD_QUANTITY >= 0 ),
    SOD_UNIT_PRICE    DECIMAL(10, 4) NOT NULL CHECK (SOD_UNIT_PRICE >= 0),
    SOD_TOTAL_PRICE   DECIMAL(10, 4) NOT NULL CHECK (SOD_TOTAL_PRICE >= 0),
    SOD_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    SOD_RECORD_STATUS VARCHAR(1)     NOT NULL,
    CONSTRAINT FK1_CORE_SALE_ORDER_DETAILS FOREIGN KEY (ID_SALE_ORDER) REFERENCES CORE.CORE_SALE_ORDER (SOR_ID),
    CONSTRAINT FK2_CORE_SALE_ORDER_DETAILS FOREIGN KEY (ID_WAREHOUSE) REFERENCES CORE.CORE_WAREHOUSE (WAR_ID)
);

CREATE TABLE CORE.CORE_COMPANY
(
    COM_ID            SERIAL PRIMARY KEY,
    COM_SOCIAL_REASON VARCHAR(100),
    COM_DESCRIPTION   VARCHAR(150),
    COM_VISION        VARCHAR(200),
    COM_MISION        VARCHAR(200),
    COM_EMAIL         VARCHAR(100),
    COM_PHONE         VARCHAR(30),
    COM_CREATED_DATE  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    COM_RECORD_STATUS VARCHAR(1) NOT NULL
);