# Content Verification

Every item in the app includes source IDs inside `index.html` data.

## Important notes

- The map image is the user-provided booth asset. A clean copy was created by removing embedded English labels and overlaying localized labels dynamically.
- Krayza/Kraiza is included because the booth owner requested it, but it uses a traditional recipe reference rather than an official tourism/government source. Please approve local spelling before printing.
- The population value is stated as the July 2025 official demographic indicator value, not as a live 2026 population estimate.

## Source register

### `user_map`
- Name: User-provided Jordan governorate map image
- URL: local asset: assets/jordan-map-original-user.png
- Type: user-provided booth asset
- Note: Used as the base map image. English labels are removed in the clean map and replaced by interactive localized labels.

### `visit_jordan`
- Name: Visit Jordan / Jordan Tourism Board
- URL: https://international.visitjordan.com/
- Type: official tourism
- Note: Official Jordan tourism source.

### `visit_jerash`
- Name: Visit Jordan - Jerash
- URL: https://international.visitjordan.com/wheretogo/jerash/
- Type: official tourism
- Note: Official tourism page for Jerash.

### `visit_amman`
- Name: Visit Jordan - Amman
- URL: https://international.visitjordan.com/wheretogo/amman/
- Type: official tourism
- Note: Official tourism page for Amman.

### `visit_madaba`
- Name: Visit Jordan - Madaba
- URL: https://international.visitjordan.com/wheretogo/madaba/
- Type: official tourism
- Note: Official tourism page for Madaba, known as the City of Mosaics.

### `visit_salt`
- Name: Visit Jordan - As-Salt
- URL: https://international.visitjordan.com/wheretogo/as-salt/
- Type: official tourism
- Note: Official tourism page for As-Salt.

### `unesco_salt`
- Name: UNESCO - As-Salt
- URL: https://whc.unesco.org/en/list/689/
- Type: UNESCO
- Note: UNESCO World Heritage page for As-Salt, the Place of Tolerance and Urban Hospitality.

### `visit_karak`
- Name: Visit Jordan - Karak
- URL: https://international.visitjordan.com/wheretogo/karak/
- Type: official tourism
- Note: Official tourism page for Karak.

### `visit_aqaba`
- Name: Visit Jordan - Aqaba
- URL: https://international.visitjordan.com/wheretogo/aqaba/
- Type: official tourism
- Note: Official tourism page for Aqaba.

### `visit_petra`
- Name: Visit Jordan - Petra
- URL: https://international.visitjordan.com/wheretogo/petra/
- Type: official tourism
- Note: Official tourism page for Petra.

### `visit_ummqais`
- Name: Visit Jordan - Umm Qais
- URL: https://international.visitjordan.com/wheretogo/umm-qais/
- Type: official tourism
- Note: Official tourism page for Umm Qais / ancient Gadara.

### `visit_unesco`
- Name: Visit Jordan - UNESCO Sites
- URL: https://international.visitjordan.com/unesco/
- Type: official tourism
- Note: Official tourism page describing UNESCO-recognized sites including Petra and Wadi Rum.

### `whc_jordan`
- Name: UNESCO World Heritage Centre - Jordan
- URL: https://whc.unesco.org/en/statesparties/jo
- Type: UNESCO
- Note: UNESCO list of World Heritage properties in Jordan.

### `visit_food`
- Name: Visit Jordan - Feasting in Jordan
- URL: https://international.visitjordan.com/page/13/feasting-in-jordan/
- Type: official tourism
- Note: Official tourism page describing Jordanian food such as Mansaf and Zarb.

### `edu_food`
- Name: Educational Travel Jordan - Food and Drinks
- URL: https://edutravel.visitjordan.com/en/page/79/Food-and-Drinks
- Type: official tourism/education
- Note: Official page listing Mansaf, Maqluba, Knafeh, Zarb, and stating Falafel and Hummus are a breakfast of choice.

### `kraiza_reference`
- Name: Chef in Disguise - Kraiza semolina pudding
- URL: https://chefindisguise.com/2016/10/25/semolina-pudding-kraiza/
- Type: traditional recipe reference
- Note: Used only for Krayza/Kraiza because it was requested by the booth owner; spelling should be reviewed locally.

### `monarchs_official`
- Name: Crown Prince Al Hussein Official Website - Hashemite Monarchs
- URL: https://www.alhussein.jo/en/the-hashemites/history-hashemites
- Type: official royal
- Note: Official list/history of Hashemite monarchs.

### `rhc_monarchs`
- Name: Royal Hashemite Court - Hashemite Monarchs
- URL: https://rhc.jo/en/hashemite-monarchs-2
- Type: official royal
- Note: Official Royal Hashemite Court page on Hashemite monarchs.

### `king_abdullah_i`
- Name: King Abdullah II Official Website - King Abdullah I
- URL: https://kingabdullah.jo/en/page/king-abdullah-bin-al-hussein-1882-1951
- Type: official royal
- Note: Official historical page for King Abdullah I; includes independence context.

### `king_abdullah_ii`
- Name: King Abdullah II Official Website - About the King
- URL: https://kingabdullah.jo/en/about-the-king
- Type: official royal
- Note: Official biography of His Majesty King Abdullah II, including marriage and children.

### `crown_prince`
- Name: Crown Prince Al Hussein Official Website
- URL: https://www.alhussein.jo/en
- Type: official royal
- Note: Official Crown Prince website; states he is the eldest son of King Abdullah II and Queen Rania.

### `queen_noor`
- Name: King Hussein Foundation - Her Majesty Queen Noor
- URL: https://www.kinghusseinfoundation.org/en/Home/Her-Majesty-Queen-Noor
- Type: official foundation
- Note: Official foundation biography of Queen Noor; states she married King Hussein in 1978.

### `population_2025`
- Name: Jordan Demographic Indicators Sheet July 2025
- URL: https://hpc.org.jo/sites/default/files/jordan_demographic_indicators_sheet_july._2025.pdf
- Type: official/statistical sheet
- Note: Reports current population size as 11.85 million in July 2025.

### `flag_info`
- Name: Jordan Armed Forces - Flag of Jordan
- URL: https://www.jaf.mil.jo/ContentstemplateC/Flag_of_the_Hashemite_Kingdom_of_Jordan.aspx
- Type: official government/military
- Note: Describes the Jordanian flag colors and seven-pointed star.

### `flag_day`
- Name: Royal Hashemite Court - Jordan Flag Day Ceremony
- URL: https://rhc.jo/en/news/king-attends-jordan-flag-day-ceremony-2
- Type: official royal
- Note: Official news page for Jordan Flag Day ceremony on 16 April.

## Category and item source mapping

### Governorates & Cities / المحافظات والمدن
- Irbid / إربد: user_map, visit_jordan
- Ajloun / عجلون: user_map, visit_jordan
- Jerash / جرش: user_map, visit_jerash
- Al Balqa / البلقاء: user_map, visit_salt, unesco_salt
- Madaba / مادبا: user_map, visit_madaba
- Amman / عمّان: user_map, visit_amman
- Az Zarqa / الزرقاء: user_map, visit_jordan
- Al Mafraq / المفرق: user_map, visit_jordan
- Al Karak / الكرك: user_map, visit_karak
- At Tafilah / الطفيلة: user_map, visit_jordan
- Ma'an / معان: user_map, visit_petra, visit_unesco
- Aqaba / العقبة: user_map, visit_aqaba

### Food & Breakfast / الطعام والإفطار
- Mansaf / المنسف: visit_food, edu_food
- Maqlooba / المقلوبة: edu_food
- Kunafa / الكنافة: edu_food
- Baqlawa / البقلاوة: edu_food
- Zarb / الزرب: visit_food, edu_food
- Krayza / الكريزة: kraiza_reference
- Hummus & Falafel / الحمص والفلافل: edu_food

### Kings & Relatives / الملوك والعلاقات العائلية
- Abdullah I / عبدالله الأول: king_abdullah_i, monarchs_official
- Talal / طلال: monarchs_official, rhc_monarchs
- Hussein / الحسين: monarchs_official, rhc_monarchs
- Abdullah II / عبدالله الثاني: king_abdullah_ii, monarchs_official
- Queen Noor / الملكة نور: queen_noor
- Queen Rania / الملكة رانيا: king_abdullah_ii
- Crown Prince Al Hussein / ولي العهد الأمير الحسين: crown_prince, king_abdullah_ii

### Jordan History / تاريخ الأردن
- Population Count / عدد السكان: population_2025
- Year Established / سنة التأسيس: king_abdullah_i, monarchs_official
- Independence Day / عيد الاستقلال: king_abdullah_i
- Flag Day / يوم العلم: flag_day, flag_info

### Historical Places to Visit / أماكن تاريخية للزيارة
- Jerash City / مدينة جرش: visit_jerash
- Um Qais / أم قيس: visit_ummqais
- Petra / البتراء: visit_petra, whc_jordan
- Wadi Rum / وادي رم: visit_unesco, whc_jordan

