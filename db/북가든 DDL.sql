DROP DATABASE IF EXISTS BookGarden;

CREATE DATABASE BookGarden;

USE BookGarden;

CREATE TABLE `member` (
	`me_id`	varchar(255) primary key	NOT NULL,
	`me_nickname`	varchar(8) unique	NOT NULL,
	`me_pw`	varchar(15)	NULL,
	`me_email`	varchar(50) unique	NOT NULL,
	`me_phone`	varchar(11)	NULL,
	`me_address`	text	NULL,
    `me_postalCode` varchar(5) NULL,
	`me_gender` varchar(6) NOT NULL default 'male',
	`me_birth`	date	NOT NULL,
	`me_adult`	int	NOT NULL default '0',
	`me_authority`	varchar(10)	NOT NULL default 'user',
	`me_fail`	int	NULL,
	`me_cookie`	varchar(255)	NULL,
	`me_report`	int	NULL,
	`me_ms_name`	varchar(10)	NOT NULL,
	`me_stop`	datetime	NULL,
	`me_cm`	varchar(20) unique	NULL,
	`me_entercount`	int	NULL,
	`me_last`	datetime	NULL,
	`me_naverId`	varchar(255)	NULL,
	`me_point` int NOT NULL default '0'
);

CREATE TABLE `review` (
	`re_num`	int primary key auto_increment	NOT NULL,
	`re_content`	text	NOT NULL,
	`re_bk_num`	int	NOT NULL,
	`re_star`	double	NOT NULL,
	`re_date`	datetime NOT NULL  default CURRENT_TIMESTAMP,
	`re_me_id`	varchar(15)	NOT NULL
);

CREATE TABLE `book` (
	`bk_num`	int primary key auto_increment	NOT NULL,
	`bk_name`	varchar(255)	NOT NULL,
	`bk_state`	varchar(4)	NOT NULL,
	`bk_me_id`	varchar(255)	NOT NULL,
	`bk_date`	datetime	NOT NULL,
	`bk_sg_num`	int	NOT NULL,
	`bk_plot`	longtext	NOT NULL,
	`bk_price`	int	NOT NULL,
	`bk_amount`	int	NOT NULL,
	`bk_index`	varchar(255)	NULL,
	`bk_isbn`	varchar(255)	NOT NULL,
	`bk_score`	double	NULL,
	`bk_reviewCount`	int	NULL,
	`bk_totalPage`	int	NOT NULL,
	`bk_agelimit`	int	NOT NULL,
	`bk_totalPurchase` int NOT NULL default 0,
    `bk_age_60_male` int NOT NULL default 0,
    `bk_age_60_female` int NOT NULL default 0,
    `bk_age_50_male` int NOT NULL default 0,
    `bk_age_50_female` int NOT NULL default 0,
    `bk_age_40_male` int NOT NULL default 0,
    `bk_age_40_female` int NOT NULL default 0,
    `bk_age_30_male` int NOT NULL default 0,
    `bk_age_30_female` int NOT NULL default 0,
    `bk_age_20_male` int NOT NULL default 0,
    `bk_age_20_female` int NOT NULL default 0,
    `bk_age_10_male` int NOT NULL default 0,
    `bk_age_10_female` int NOT NULL default 0
);

CREATE TABLE `member_state` (
	`ms_name`	varchar(10) primary key	NOT NULL
);

CREATE TABLE `report` (
	`rp_num`	int primary key auto_increment	NOT NULL,
	`rp_me_id`	varchar(15)	NOT NULL,
	`rp_target`	varchar(50)	NOT NULL,
	`rp_content`	text	NULL,
	`rp_rt_num`	int	NOT NULL,
    `rp_date` datetime NOT NULL  default CURRENT_TIMESTAMP,
    `rp_id` varchar(15) NOT NULL
);

CREATE TABLE `report_type` (
	`rt_num`	int primary key auto_increment	NOT NULL,
	`rt_name`	varchar(20)	NOT NULL,
	`rt_category`	varchar(20)	NULL
);

CREATE TABLE `genre` (
	`ge_num`	int primary key auto_increment	NOT NULL,
	`ge_name`	varchar(10)	NULL
);

CREATE TABLE `cart` (
	`ca_num`	int primary key auto_increment	NOT NULL,
	`ca_bk_num`	int	NOT NULL,
	`ca_me_id`	varchar(15)	NOT NULL
);

CREATE TABLE `buy` (
	`bu_num`	varchar(255) primary key	NOT NULL,
	`bu_me_id`	varchar(15)	NOT NULL,
	`bu_state`	varchar(5)	NOT NULL,
	`bu_payment`	varchar(15)	NOT NULL,
	`bu_total`	int	NOT NULL,
	`bu_ori_total`	int	NOT NULL,
	`bu_date`	datetime	NOT NULL
);

CREATE TABLE `post` (
	`po_num`	int primary key auto_increment	NOT NULL,
	`po_title`	varchar(50)	NOT NULL,
	`po_content`	text	NOT NULL,
	`po_me_id`	varchar(15)	NOT NULL,
	`po_date`	datetime	NOT NULL,
	`po_co_num`	int	NOT NULL,
	`po_view`	int	NULL,
	`po_like`	int	NULL
);

CREATE TABLE `community` (
	`co_num`	int primary key auto_increment	NOT NULL,
	`co_name`	varchar(50) unique	NOT NULL
);

CREATE TABLE `book_file` (
	`bf_num`	int primary key auto_increment	NOT NULL,
	`bf_name`	varchar(255)	NOT NULL,
	`bf_bk_num`	int	NOT NULL,
	`bf_type`	varchar(255)	NOT NULL
);

CREATE TABLE `writer` (
	`wr_num`	int primary key auto_increment	NOT NULL,
	`wr_name`	varchar(50)	NOT NULL,
	`wr_profile`	text	NULL
);

CREATE TABLE `achievenent` (
	`ac_num`	int primary key auto_increment	NOT NULL,
	`ac_title`	varchar(50)	NOT NULL,
	`ac_info`	varchar(50)	NOT NULL,
	`ac_id` varchar(50) NOT NULL,
	`ac_icon` varchar(45) NOT NULL
);

CREATE TABLE `achievenent_List` (
	`acl_ac_num`	int	NOT NULL,
	`acl_me_id`	varchar(15)	NOT NULL,
	`acl_date`	datetime	NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `acl_check` varchar(2) NOT NULL DEFAULT 'X'
);

CREATE TABLE `book_List` (
	`bl_me_id`	varchar(15)	NOT NULL,
	`bl_bk_num`	int	NOT NULL,
	`bl_nowPage`	int	NOT NULL
);

CREATE TABLE `writer_List` (
	`wl_num`	int primary key auto_increment	NOT NULL,
	`wl_wr_num`	int	NOT NULL,
	`wl_bk_num`	int	NOT NULL,
	`wl_wt_num`	int	NOT NULL
);

CREATE TABLE `writer_Type` (
	`wt_num`	int primary key auto_increment	NOT NULL,
	`wt_name`	varchar(20)	NOT NULL
);

CREATE TABLE `buy_List` (
	`bl_num`	varchar(255)	NOT NULL,
	`bl_bk_num`	int	NOT NULL,
	`bl_me_id`	varchar(15)	NOT NULL
);

CREATE TABLE `point_Rate` (
	`pr_rate`	int primary key	NOT NULL
);

CREATE TABLE `point_History` (
	`ph_num`	int primary key auto_increment	NOT NULL,
	`ph_date`	datetime	NOT NULL,
	`ph_type`	varchar(2)	NOT NULL,
	`ph_content`	varchar(255)	NOT NULL,
	`ph_me_id`	varchar(15)	NOT NULL,
	`ph_bu_num`	varchar(255)	NOT NULL,
	`ph_point`	int	NOT NULL
);

CREATE TABLE `secondgenre` (
	`sg_num`	int primary key auto_increment	NOT NULL,
	`sg_name`	varchar(10)	NULL,
	`sg_parent`	int	NOT NULL
);

ALTER TABLE `member` ADD CONSTRAINT `FK_member_state_TO_member_1` FOREIGN KEY (
	`me_ms_name`
)
REFERENCES `member_state` (
	`ms_name`
);

ALTER TABLE `review` ADD CONSTRAINT `FK_book_TO_review_1` FOREIGN KEY (
	`re_bk_num`
)
REFERENCES `book` (
	`bk_num`
);

ALTER TABLE `review` ADD CONSTRAINT `FK_member_TO_review_1` FOREIGN KEY (
	`re_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `book` ADD CONSTRAINT `FK_secondgenre_TO_book_1` FOREIGN KEY (
	`bk_sg_num`
)
REFERENCES `secondgenre` (
	`sg_num`
);

ALTER TABLE `book` ADD CONSTRAINT `FK_member_TO_book_1` FOREIGN KEY (
	`bk_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `report` ADD CONSTRAINT `FK_member_TO_report_1` FOREIGN KEY (
	`rp_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `report` ADD CONSTRAINT `FK_report_type_TO_report_1` FOREIGN KEY (
	`rp_rt_num`
)
REFERENCES `report_type` (
	`rt_num`
);

ALTER TABLE `cart` ADD CONSTRAINT `FK_book_TO_cart_1` FOREIGN KEY (
	`ca_bk_num`
)
REFERENCES `book` (
	`bk_num`
);

ALTER TABLE `cart` ADD CONSTRAINT `FK_member_TO_cart_1` FOREIGN KEY (
	`ca_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `buy` ADD CONSTRAINT `FK_member_TO_buy_1` FOREIGN KEY (
	`bu_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `post` ADD CONSTRAINT `FK_member_TO_post_1` FOREIGN KEY (
	`po_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `post` ADD CONSTRAINT `FK_community_TO_post_1` FOREIGN KEY (
	`po_co_num`
)
REFERENCES `community` (
	`co_num`
);

ALTER TABLE `book_file` ADD CONSTRAINT `FK_book_TO_book_file_1` FOREIGN KEY (
	`bf_bk_num`
)
REFERENCES `book` (
	`bk_num`
);

ALTER TABLE `achievenent_List` ADD CONSTRAINT `FK_achievenent_TO_achievenent_List_1` FOREIGN KEY (
	`acl_ac_num`
)
REFERENCES `achievenent` (
	`ac_num`
);

ALTER TABLE `achievenent_List` ADD CONSTRAINT `FK_member_TO_achievenent_List_1` FOREIGN KEY (
	`acl_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `book_List` ADD CONSTRAINT `FK_member_TO_book_List_1` FOREIGN KEY (
	`bl_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `book_List` ADD CONSTRAINT `FK_book_TO_book_List_1` FOREIGN KEY (
	`bl_bk_num`
)
REFERENCES `book` (
	`bk_num`
);

ALTER TABLE `writer_List` ADD CONSTRAINT `FK_writer_TO_writer_List_1` FOREIGN KEY (
	`wl_wr_num`
)
REFERENCES `writer` (
	`wr_num`
);

ALTER TABLE `writer_List` ADD CONSTRAINT `FK_book_TO_writer_List_1` FOREIGN KEY (
	`wl_bk_num`
)
REFERENCES `book` (
	`bk_num`
);

ALTER TABLE `writer_List` ADD CONSTRAINT `FK_writer_Type_TO_writer_List_1` FOREIGN KEY (
	`wl_wt_num`
)
REFERENCES `writer_Type` (
	`wt_num`
);

ALTER TABLE `buy_List` ADD CONSTRAINT `FK_buy_TO_buy_List_1` FOREIGN KEY (
	`bl_num`
)
REFERENCES `buy` (
	`bu_num`
);

ALTER TABLE `buy_List` ADD CONSTRAINT `FK_book_TO_buy_List_1` FOREIGN KEY (
	`bl_bk_num`
)
REFERENCES `book` (
	`bk_num`
);

ALTER TABLE `buy_List` ADD CONSTRAINT `FK_member_TO_buy_List_1` FOREIGN KEY (
	`bl_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `point_History` ADD CONSTRAINT `FK_member_TO_point_History_1` FOREIGN KEY (
	`ph_me_id`
)
REFERENCES `member` (
	`me_id`
);

ALTER TABLE `point_History` ADD CONSTRAINT `FK_buy_TO_point_History_1` FOREIGN KEY (
	`ph_bu_num`
)
REFERENCES `buy` (
	`bu_num`
);

ALTER TABLE `secondgenre` ADD CONSTRAINT `FK_genre_TO_secondgenre_1` FOREIGN KEY (
	`sg_parent`
)
REFERENCES `genre` (
	`ge_num`
);