"use client";
import Link from "next/link";
import { AlertCircle, ArrowLeft, BookOpenCheck, BriefcaseBusiness, CheckCircle2, ExternalLink, GraduationCap, School, Target, XCircle } from "lucide-react";
import { useState } from "react";

const careers = {
  peguam: {
    name:"Undang-undang", course:"LLB / Undang-undang Sivil / Syariah & Undang-undang / Undang-undang Korporat & Komersial", stream:"Terbuka kepada aliran Sains atau Sastera, tertakluk kepada syarat universiti.",
    spm:["Bahasa Melayu dan Sejarah mesti memenuhi syarat am kemasukan.","Bahasa Inggeris sangat penting; sesetengah universiti menetapkan gred atau MUET yang lebih tinggi.","Matematik diperlukan oleh sesetengah program undang-undang."],
    stpm:["Pengajian Am","Bahasa Melayu atau Sejarah","Ekonomi, Pengajian Perniagaan atau subjek lain yang mengasah kemahiran berhujah"],
    target:"Sasarkan PNGK 3.50 ke atas, sekurang-kurangnya B+ bagi subjek utama dan MUET Band 4 atau lebih tinggi.",
    official:"Contoh UM 2026: PNGK minimum 3.30, sekurang-kurangnya B- dalam dua subjek, MUET Band 4 dan temu duga.",
    source:"https://study.um.edu.my/Bachelor-of-laws"
  },
  doktor: {
    name:"Perubatan & Kesihatan", course:"Perubatan, Veterinar, Pergigian, Farmasi dan Sains Kesihatan", stream:"Kebanyakan program memerlukan laluan Sains.",
    spm:["Biologi, Kimia, Fizik, Matematik dan Matematik Tambahan sangat penting.","Bahasa Melayu, Bahasa Inggeris dan Sejarah perlu memenuhi syarat am serta syarat khas program."],
    stpm:["Kimia","Biologi","Physics atau Mathematics"],
    target:"Program klinikal sangat kompetitif. Sasarkan keputusan yang jauh melebihi syarat minimum, khususnya dalam Kimia dan Biologi.",
    official:"Pilih cabang dahulu kerana Perubatan, Veterinar, Pergigian, Farmasi dan Sains Kesihatan mempunyai syarat yang berbeza.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  akauntan: {
    name:"Perakaunan, Kewangan & Ekonomi", course:"Perakaunan / Kewangan / Ekonomi / Perbankan & Kewangan Islam", stream:"Aliran Sastera atau Sains, bergantung pada program.",
    spm:["Matematik atau Matematik Tambahan biasanya diberi perhatian.","Prinsip Perakaunan dan Bahasa Inggeris membantu, walaupun tidak diwajibkan oleh semua universiti."],
    stpm:["Ekonomi","Pengajian Perniagaan","Mathematics atau subjek lain yang diterima program"],
    target:"Sasarkan sekurang-kurangnya B+ dalam subjek berkaitan dan PNGK 3.30 ke atas untuk pilihan yang lebih luas.",
    official:"Syarat subjek dan gred berbeza antara program Perakaunan, Kewangan dan Perniagaan.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  jurutera: {
    name:"Jurutera", course:"Ijazah Sarjana Muda Kejuruteraan", stream:"Laluan Sains.",
    spm:["Matematik Tambahan, Matematik dan Fizik ialah asas penting.","Kimia juga penting khususnya untuk Kejuruteraan Kimia dan beberapa bidang berkaitan."],
    stpm:["Mathematics","Physics","Chemistry untuk bidang yang memerlukannya"],
    target:"Sasarkan A atau A- dalam Mathematics dan Physics untuk lebih kompetitif.",
    official:"Contoh Kejuruteraan Elektrik UM 2026: PNGK minimum 3.00 serta sekurang-kurangnya B dalam Mathematics dan Physics; MUET Band 3.",
    source:"https://study.um.edu.my/bachelor-of-electrical-engineering"
  },
  guru: {
    name:"Pendidikan", course:"Pendidikan Sains & Matematik / TESL / Pendidikan Khas / Bimbingan & Kaunseling / Pendidikan Sukan", stream:"Aliran bergantung pada bidang pengkhususan.",
    spm:["Bahasa Melayu dan Sejarah perlu memenuhi syarat am.","Subjek yang hendak diajar perlu mempunyai keputusan yang kuat."],
    stpm:["Pilih subjek yang sepadan dengan opsyen pengajaran","Pengajian Am","Kukuhkan Bahasa Inggeris dan MUET"],
    target:"Sasarkan B+ atau A dalam subjek pengkhususan serta PNGK sekurang-kurangnya 3.00.",
    official:"Kebanyakan program pendidikan mempunyai syarat khas dan sesetengahnya memerlukan ujian atau temu duga.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  psikologi: {
    name:"Psikologi, Kaunseling & Pembangunan Manusia", course:"Psikologi / Bimbingan & Kaunseling / Sains Pembangunan Manusia / Pembangunan Manusia dengan Pengurusan / Pembangunan Manusia dengan IT", stream:"Terbuka kepada aliran Sains dan Sains Sosial bergantung pada program.",
    spm:["Matematik dan subjek Sains boleh menjadi syarat khusus bagi sesetengah program.","Bahasa Inggeris penting untuk bacaan akademik dan komunikasi profesional."],
    stpm:["Subjek diterima bergantung pada universiti","Program kaunseling boleh mempunyai syarat tambahan seperti MEdSI, temu duga atau ujian khas"],
    target:"Sasarkan PNGK sekurang-kurangnya 3.00 untuk pilihan lebih luas. Jangan samakan Psikologi dengan Kaunseling kerana laluan profesionalnya berbeza.",
    official:"UPSI Bimbingan & Kaunseling mensyaratkan PNGK minimum 3.00 serta MEdSI dan temu duga; program Psikologi UKM dan Pembangunan Manusia UPM tidak menerbitkan angka PNGK khusus.",
    source:"https://www.ukm.my/studyukm/psychology-bachelor-of-social-sciences-hons/"
  },
  farmasi: {
    name:"Pegawai Farmasi", course:"Ijazah Sarjana Muda Farmasi", stream:"Laluan Sains.",
    spm:["Kimia, Biologi, Fizik, Matematik dan Matematik Tambahan lazimnya diperiksa dalam syarat khas.","Bahasa Inggeris dan Bahasa Melayu juga perlu memenuhi syarat program."],
    stpm:["Kimia","Biologi","Physics atau Mathematics"],
    target:"Sasarkan A dalam Kimia dan sekurang-kurangnya A- bagi subjek Sains lain; PNGK hampir 4.00 lebih kompetitif.",
    official:"Syarat minimum sains, MUET dan temu duga berbeza mengikut universiti.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  teknologi: {
    name:"Komputer, Data & AI", course:"Sains Komputer / Kecerdasan Buatan / Sains Data / Keselamatan Siber", stream:"Kebanyakan program teknikal mengutamakan Mathematics dan subjek Sains.",
    spm:["Matematik dan Matematik Tambahan sangat penting.","Fizik, Kimia, Biologi, Sains Komputer atau ICT boleh menjadi subjek sokongan yang diterima."],
    stpm:["Mathematics","Physics, Chemistry atau Biology","Asas pengaturcaraan melalui pembelajaran kendiri sangat membantu"],
    target:"Sasarkan sekurang-kurangnya B+ dalam Mathematics dan subjek Sains serta PNGK 3.30 ke atas.",
    official:"Contoh Sains Komputer UM 2026: PNGK minimum 3.00 aliran Sains, B- dalam Mathematics dan B- dalam satu subjek Sains yang diterima; MUET Band 3.5.",
    source:"https://study.um.edu.my/bachelor-of-computer-science-computer-system-and-network"
  },
  sains: {
    name:"Sains Tulen & Sains Gunaan", course:"Fizik / Kimia / Biologi / Sains Bahan / Geosains / Sains Forensik", stream:"Laluan Sains mengikut bidang pengkhususan.",
    spm:["Matematik dan subjek Sains berkaitan perlu diberi perhatian.","Matematik Tambahan penting untuk Fizik, Matematik dan Statistik."],
    stpm:["Physics, Chemistry atau Biology mengikut program","Mathematics","Pengajian Am"],
    target:"Sasarkan PNGK 3.00 ke atas dan keputusan kukuh dalam subjek pengkhususan.",
    official:"Program sains tulen mempunyai kombinasi subjek khas yang berbeza. Semak cabang dan universiti sebelum memohon.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  perniagaan: {
    name:"Perniagaan, Pengurusan & Keusahawanan", course:"Pengurusan / Pemasaran / Sumber Manusia / Keusahawanan / Perniagaan Antarabangsa", stream:"Terbuka kepada aliran Sains atau Sains Sosial mengikut program.",
    spm:["Matematik sering menjadi syarat khusus untuk Ekonomi, Kewangan dan Analitik.","Bahasa Inggeris membantu untuk pengajian dan komunikasi profesional."],
    stpm:["Ekonomi","Pengajian Perniagaan","Mathematics atau subjek yang diterima program"],
    target:"Sasarkan PNGK 3.00 ke atas; program popular dan analitik biasanya lebih kompetitif.",
    official:"Bezakan syarat Ekonomi, Kewangan, Perbankan, Pemasaran dan Pengurusan kerana setiap program tidak sama.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  matematik: {
    name:"Matematik, Statistik & Aktuari", course:"Matematik / Statistik / Sains Aktuari / Matematik Industri / Analitik Kuantitatif", stream:"Paling sesuai untuk aliran Sains yang mengambil Mathematics; syarat khusus berbeza mengikut universiti.",
    spm:["Matematik dan Matematik Tambahan sangat penting untuk laluan kuantitatif.","Sesetengah program turut menyemak keputusan subjek Sains dan Bahasa Inggeris."],
    stpm:["Mathematics","Physics, Chemistry atau Biology bagi program yang mensyaratkannya","MUET mengikut syarat universiti"],
    target:"Sasarkan sekurang-kurangnya B+ atau A- dalam Mathematics dan PNGK 3.30 ke atas. Sains Aktuari biasanya lebih kompetitif berbanding Matematik atau Statistik.",
    official:"Contoh UM 2026: Matematik minimum PNGK 3.00; Sains Aktuari minimum PNGK 3.50. Kedua-duanya memerlukan sekurang-kurangnya B- dalam Mathematics/Matematik Tambahan dan B- dalam satu daripada Biology, Physics atau Chemistry; MUET Band 3.0.",
    source:"https://study.um.edu.my/bachelor-of-actuarial-science"
  },
  senibina: {
    name:"Senibina (Arkitek)", course:"Sarjana Muda Senibina / Sains Senibina / Seni Bina Landskap", stream:"Aliran Sains lazimnya diperlukan; sesetengah universiti menerima Sains Sosial dengan subjek tertentu.",
    spm:["Kepujian Matematik diperlukan oleh hampir semua program; sesetengah turut mensyaratkan Matematik Tambahan.","Kepujian Bahasa Melayu dan lulus Sejarah mengikut syarat am universiti.","Seni Visual/Lukisan Kejuruteraan menjadi kelebihan tetapi tidak lagi wajib di kebanyakan program."],
    stpm:["Minimum Gred B hingga B- dalam sekurang-kurangnya dua subjek diterima: Matematik M/T, Fizik, Kimia, Biologi, Geografi, Sejarah, Ekonomi, Seni Visual, Perakaunan, Pengajian Perniagaan atau ICT","PNGK keseluruhan antara 2.00 hingga 3.00 bergantung universiti"],
    target:"Program ini sangat kompetitif dan melibatkan ujian lukisan serta temu duga wajib — sasarkan PNGK 3.00 ke atas untuk pilihan yang lebih luas.",
    official:"Contoh: UTM dan USM mensyaratkan PNGK minimum 3.00, manakala UPM menerima PNGK minimum 2.00; ketiga-tiganya tetap mewajibkan ujian dan/atau temu duga.",
    source:"https://admission.utm.my/wp-content/uploads/sites/461/2026/02/SYARAT-KHAS-SARJANA-MUDA-UTM-SESI-20262027.pdf"
  },
  kreatif: {
    name:"Seni, Reka Bentuk & Kreatif", course:"Seni Halus / Reka Bentuk Grafik / Reka Bentuk Industri / Media Baharu / Seni Bina / Seni Bina Landskap / Animasi & Game Design", stream:"Terbuka kepada pelbagai aliran, tetapi program reka bentuk/seni biasanya memerlukan portfolio, temu duga atau penilaian bakat.",
    spm:["Bahasa Melayu dan Bahasa Inggeris penting.","Matematik dan subjek teknikal boleh menjadi syarat untuk Seni Bina atau Reka Bentuk Industri.","Portfolio sangat penting untuk kebanyakan program seni dan reka bentuk."],
    stpm:["Syarat berbeza mengikut universiti.","Sesetengah program menerima pelbagai kombinasi STPM tetapi mewajibkan temu duga/portfolio."],
    target:"Sediakan portfolio yang kemas dan autentik. Untuk program yang ada temu duga, kekuatan hasil kerja dan proses reka bentuk sangat penting selain syarat akademik.",
    official:"USM Fine Arts mensyaratkan PNGK minimum 2.00, MUET Band 1.0, temu duga, audition dan portfolio (disahkan pada halaman rasmi USM); kebanyakan program reka bentuk/media lain (UPM, UiTM) tidak menerbitkan angka PNGK khusus. Nota: subjek Seni Bina dan Seni Bina Landskap juga muncul di bawah bidang Senibina (Arkitek) yang berasingan — rujuk bidang itu untuk perbandingan universiti yang lebih terperinci.",
    source:"https://arts.usm.my/index.php/programmes/undergraduate/ba-hons-fine-arts"
  },
  kesihatanbersekutu: {
    name:"Kesihatan Bersekutu", course:"Sains Bioperubatan / Dietetik / Pemakanan / Fisioterapi / Terapi Cara Kerja / Pengimejan Diagnostik & Radioterapi / Audiologi / Kesihatan Alam Sekitar", stream:"Paling sesuai untuk aliran Sains. Biology, Chemistry dan Mathematics/Physics lazimnya menjadi asas penting.",
    spm:["Biologi, Kimia, Matematik dan Bahasa Inggeris sangat penting.","Sesetengah program kesihatan mempunyai syarat kesihatan fizikal atau temu duga."],
    stpm:["Biology / Chemistry / Mathematics / Physics mengikut program","MUET mengikut universiti"],
    target:"Sasarkan PNGK 3.00 ke atas dan keputusan kukuh dalam Biology/Chemistry. Program klinikal dan profesional boleh lebih kompetitif daripada syarat minimum.",
    official:"UKM ialah universiti utama bagi tujuh daripada lapan program ini (Biomedical Science, Dietetics, Physiotherapy, Occupational Therapy, Diagnostic Imaging & Radiotherapy, Audiology, Environmental & Occupational Health), dengan UPM menawarkan Biomedical Sciences dan Nutrition and Community Health; tiada satu pun menerbitkan angka PNGK minimum khusus. Nota: subjek Kesihatan Alam Sekitar & Pekerjaan juga muncul di bawah bidang Alam Sekitar & Kelestarian — kandungan sama, dua bidang berasingan.",
    source:"https://www.ukm.my/studyukm/bachelor-of-biomedical-science-with-honours/"
  },
  alam: {
    name:"Alam Sekitar & Kelestarian", course:"Pengurusan Alam Sekitar / Sains & Teknologi Alam Sekitar / Konservasi / Taman & Rekreasi / Kesihatan Alam Sekitar / Kelestarian", stream:"Laluan multidisiplin. Program sains memerlukan asas Chemistry/Biology/Physics/Mathematics yang lebih kuat; program pengurusan pula menggabungkan sains, dasar dan pengurusan.",
    spm:["Matematik dan subjek Sains penting untuk kebanyakan program.","Bahasa Inggeris membantu untuk laporan, undang-undang alam sekitar dan komunikasi profesional."],
    stpm:["Biology / Chemistry / Physics / Mathematics mengikut program","MUET mengikut universiti"],
    target:"Sasarkan PNGK 3.00 ke atas. Bezakan Pengurusan Alam Sekitar, Sains Alam Sekitar dan Kesihatan Alam Sekitar kerana ketiga-tiganya membawa kepada laluan kerjaya yang berbeza.",
    official:"UPM menawarkan dua program berasingan (Bachelor of Environmental Management dan Bachelor of Environmental Science and Technology) serta Parks & Recreation Science; UKM menawarkan Bachelor of Science (Environmental Science) 4 tahun; UKM dan UPM turut mempunyai program berasingan untuk Environmental & Occupational Health. Tiada satu pun menerbitkan angka PNGK minimum khusus.",
    source:"https://env.upm.edu.my/akademik/undergraduate/bacelor_pengurusan_alam_sekitar-1099"
  },
  pentadbiran: {
    name:"Pentadbiran Awam, Politik & Hubungan Antarabangsa", course:"Sains Politik / Pengurusan Awam / Hubungan Antarabangsa / Dasar Awam / Diplomasi & Pengajian Strategik", stream:"Terbuka kepada aliran Sains dan Sains Sosial tertakluk syarat program.",
    spm:["Bahasa Inggeris sangat penting untuk Hubungan Antarabangsa dan Diplomasi.","Matematik atau subjek ekonomi/perniagaan boleh menjadi syarat khusus bagi sesetengah program pengurusan awam."],
    stpm:["Program boleh menerima STPM Sastera atau Sains.","PNGK minimum dan MUET berbeza mengikut universiti."],
    target:"Sasarkan PNGK 3.00 ke atas untuk pilihan yang lebih luas, khususnya Hubungan Antarabangsa dan program yang lebih kompetitif.",
    official:"UUM Pengurusan Awam mensyaratkan PNGK minimum 2.75, manakala UUM Pengurusan Hal Ehwal Antarabangsa mensyaratkan PNGK minimum 3.00 (kedua-dua disahkan pada halaman rasmi UUM); Sains Politik UKM/USM dan International & Strategic Studies UM tidak menerbitkan angka PNGK khusus.",
    source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-public-management-with-honours"
  },
  pertanian: {
    name:"Pertanian, Perhutanan & Sains Makanan", course:"Sains Pertanian / Hortikultur / Agribisnes / Perhutanan / Akuakultur / Sains & Teknologi Makanan / Pengurusan Perladangan / Teknologi Pertanian Pintar", stream:"Paling sesuai untuk aliran Sains, tetapi program agribisnes tertentu boleh menerima latar Sains Sosial tertakluk syarat.",
    spm:["Subjek Sains dan Matematik lazimnya penting untuk program sains pertanian, akuakultur dan makanan.","Ekonomi, Pengajian Perniagaan atau Prinsip Perakaunan boleh membantu bagi laluan Agribisnes."],
    stpm:["Biology / Chemistry / Mathematics / Physics mengikut program","Ekonomi atau Pengajian Perniagaan bagi program tertentu","MUET mengikut syarat universiti"],
    target:"Sasarkan PNGK 3.00 ke atas untuk pilihan yang lebih luas. Syarat minimum tidak semestinya sama dengan tahap persaingan sebenar semasa UPU.",
    official:"UPM ialah universiti utama bagi lapan program ini (Sains Pertanian, Hortikultur, Agribisnes, Perhutanan, Akuakultur, Sains & Teknologi Makanan, Pengurusan Perladangan, Teknologi Pertanian Pintar); tiada satu pun menerbitkan angka PNGK minimum khusus pada halaman rasmi 2026/2027, jadi rujuk buku syarat kemasukan UPM semasa.",
    source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"
  },
  veterinar: {
    name:"Veterinar & Sains Haiwan", course:"Doktor Perubatan Veterinar / Sains Haiwan / Kesihatan Haiwan / Teknologi Penternakan", stream:"Paling sesuai untuk aliran Sains, khususnya Biology dan Chemistry.",
    spm:["Biologi, Kimia, Matematik dan Bahasa Inggeris sangat penting untuk laluan veterinar.","Program veterinar profesional mempunyai syarat lebih ketat dan biasanya melibatkan temu duga."],
    stpm:["Biology","Chemistry","MUET mengikut syarat program"],
    target:"Untuk DVM, sasarkan PNGK sekurang-kurangnya 3.50 dengan keputusan sangat kuat dalam Biology dan Chemistry. Sains Haiwan dan Teknologi Penternakan mempunyai laluan kemasukan berbeza.",
    official:"UPM Doctor of Veterinary Medicine mensyaratkan PNGK minimum 3.50, minimum B+ Biology dan B Chemistry (atau sebaliknya), MUET Band 3.0 serta temu duga wajib, program profesional 5 tahun; UMK turut menawarkan DVM (kod UPU UL6640001, temu duga diperlukan) dan Teknologi Penternakan, manakala UPM Bachelor of Animal Science tidak menerbitkan angka PNGK khusus.",
    source:"https://vet.upm.edu.my/academic_members/undergraduate/admission_requirement-391?L=bm"
  },
  marin: {
    name:"Sains Marin & Akuatik", course:"Sains Marin / Akuakultur / Sains Perikanan / Biologi Akuatik / Oseanografi / Teknologi Laut & GIS", stream:"Paling sesuai untuk aliran Sains. Biology, Chemistry, Physics dan Mathematics boleh menjadi subjek penting bergantung pada program.",
    spm:["Subjek Sains dan Matematik memberi asas penting untuk program marin dan akuatik.","Bahasa Inggeris penting untuk pembacaan saintifik dan latihan lapangan."],
    stpm:["Biology / Physics / Chemistry / Mathematics mengikut program","MUET mengikut syarat universiti"],
    target:"Sasarkan PNGK 3.00 ke atas untuk pilihan lebih luas. Untuk UMT Marine Science, syarat minimum STPM yang diterbitkan ialah sekurang-kurangnya Gred C dalam satu subjek Sains/Matematik yang diterima dan MUET Band 2.0.",
    official:"UMT Bachelor in Science (Marine Science) mensyaratkan minimum Gred C dalam satu subjek daripada Biology/Physics/Chemistry/Mathematics T/M serta MUET Band 2.0 (disahkan pada halaman rasmi UMT); UKM Marine Sciences, UMS Marine Science/Aquaculture dan UPM Aquaculture tidak menerbitkan angka PNGK khusus.",
    source:"https://www.umt.edu.my/sarjana-muda-sains-sains-marin-dengan-kepujian-fssm/?lang=ms"
  },
  kerjasosial: {
    name:"Kerja Sosial & Pembangunan Komuniti", course:"Kerja Sosial / Pembangunan Komuniti / Pengurusan Pembangunan / Pembangunan Manusia", stream:"Terbuka kepada aliran Sains dan Sains Sosial bergantung pada program.",
    spm:["Bahasa Melayu dan Bahasa Inggeris penting untuk komunikasi profesional, dokumentasi dan kerja lapangan.","Subjek Sejarah, Ekonomi, Geografi, Sosiologi dan Pengajian Perniagaan memberi asas yang relevan."],
    stpm:["Kebanyakan program menerima pelbagai kombinasi STPM.","Program profesional Kerja Sosial boleh melibatkan temu duga atau penilaian tambahan.","MUET mengikut universiti."],
    target:"Sasarkan PNGK 3.00 ke atas untuk pilihan lebih luas. Bezakan Kerja Sosial sebagai profesion bantuan daripada Pembangunan Komuniti atau Pengurusan Pembangunan yang lebih luas.",
    official:"UUM Pengurusan Pembangunan mensyaratkan PNGK minimum 2.75 (disahkan pada halaman rasmi UUM); UKM Kerja Sosial dan Sains Pembangunan, USM Kerja Sosial dan UPM Pembangunan Manusia tidak menerbitkan angka PNGK khusus. Nota: subjek Pembangunan Manusia/Komuniti UPM turut muncul di bawah bidang Psikologi, Kaunseling & Pembangunan Manusia dan Sains Sosial & Kemanusiaan — rujuk mana-mana bidang untuk maklumat yang sama.",
    source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-development-management-with-honours"
  },
  maklumat: {
    name:"Maklumat, Perpustakaan & Pengurusan Rekod", course:"Pengurusan Perpustakaan / Pengurusan Rekod / Pengurusan Sistem Maklumat / Pengurusan Kandungan / Arkib & Kurasi Digital", stream:"Terbuka kepada pelbagai aliran tertakluk syarat universiti.",
    spm:["Bahasa Melayu dan Bahasa Inggeris penting.","Matematik atau Matematik Tambahan perlu diberi perhatian untuk beberapa laluan.","Kemahiran ICT sangat membantu tetapi bidang ini bukan sama dengan Sains Komputer."],
    stpm:["UiTM menerbitkan laluan STPM khusus untuk program Sains Maklumat.","MUET minimum berbeza mengikut program."],
    target:"Sasarkan PNGK 2.80–3.00 ke atas untuk margin yang lebih selesa walaupun syarat minimum UiTM bagi beberapa program ialah 2.30.",
    official:"UiTM mensyaratkan PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am bagi keempat-empat program Sains Maklumat (Library Management SI260, Records Management SI261, Information Systems Management SI262, Information Content Management SI263); Arkib & Kurasi Digital dipaparkan sebagai laluan dalam Records Management kerana tiada ijazah berasingan.",
    source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si260"
  },
  sukan: {
    name:"Sukan, Kecergasan & Kejurulatihan", course:"Sains Sukan / Pengurusan Sukan / Kesihatan & Kecergasan / Pendidikan Sains Sukan / Pendidikan Jasmani / Sains Kejurulatihan", stream:"Terbuka kepada aliran Sains dan sesetengah aliran Sains Sosial mengikut program. Penglibatan sukan boleh menjadi syarat tambahan.",
    spm:["Matematik dan subjek Sains membantu untuk program berasaskan fisiologi, biomekanik dan prestasi.","Sesetengah program memerlukan bukti penglibatan sukan, ujian fizikal atau temu duga."],
    stpm:["Sains Sukan atau subjek Sains memberi kelebihan bagi program sains prestasi.","Program pengurusan sukan lebih fleksibel terhadap kombinasi STPM."],
    target:"Sasarkan PNGK 3.00 ke atas dan kekalkan rekod penglibatan sukan. Bagi program tertentu, tahap kecergasan dan pengalaman sukan dinilai selain akademik.",
    official:"UiTM (SR241 Pengurusan Sukan, SR243 Sains Sukan, SR245 Kesihatan & Kecergasan), UM (Sports Management, Exercise Science) dan UPSI (Pendidikan Sains Sukan, Pendidikan Jasmani, Sains Kejurulatihan) ialah universiti utama yang disahkan aktif pada 2026; tiada satu pun menerbitkan PNGK minimum khusus. Nota kemas kini: cabang \"Rekreasi & Kecergasan\" dan \"Psikologi Sukan\" digugurkan kerana tiada program ijazah khusus disahkan — kandungannya kini sebahagian daripada Kesihatan & Kecergasan dan Sains Kejurulatihan.",
    source:"https://sports.uitm.edu.my/index.php/programme"
  },
  islam: {
    name:"Pengajian Islam, Syariah & Industri Halal", course:"Syariah / Fiqh & Fatwa / Usuluddin / Dakwah & Pembangunan Insan / Muamalat & Kewangan Islam / Industri Halal", stream:"Kebanyakan program memerlukan latar Pengajian Islam dan/atau Bahasa Arab, bergantung pada universiti.",
    spm:["Bahasa Arab sangat penting bagi banyak program Pengajian Islam.","Pendidikan Islam, Syariah, al-Quran & al-Sunnah atau subjek berkaitan boleh menjadi syarat khusus.","Bahasa Inggeris dan Matematik juga boleh menjadi syarat tambahan mengikut program."],
    stpm:["Bahasa Arab / Syariah / Usuluddin atau subjek berkaitan mengikut program","MUET mengikut universiti"],
    target:"Sasarkan PNGK 3.00 ke atas dan keputusan kuat dalam Bahasa Arab serta subjek Pengajian Islam. Program seperti Halal Industry dan Law & Shariah mempunyai syarat yang berbeza daripada Usuluddin.",
    official:"USIM (Law and Shariah, Fiqh and Fatwa UQ6221003, Syariah Halal Industry) dan UM (Usuluddin — trek Islamic Thought & Spiritual Studies, Da'wah & Human Development) ialah sumber utama yang disahkan aktif 2026; tiada satu pun menerbitkan PNGK minimum khusus. Nota: syarat STPM Sastera bagi Halal Industry (C+ Bahasa Arab & Syariah, MUET Band 3) berasal daripada dokumen terdahulu — sahkan semula untuk sesi semasa sebelum memohon.",
    source:"https://admission.usim.edu.my/program-details/?pid=20"
  },
  bahasa: {
    name:"Bahasa, Komunikasi & Media", course:"Bahasa Melayu / Linguistik / Komunikasi / Kewartawanan / Perhubungan Awam / Media Baharu", stream:"Terbuka kepada aliran Sains atau Sains Sosial mengikut program.",
    spm:["Bahasa Melayu dan Bahasa Inggeris sangat penting.","Sejarah, Kesusasteraan dan Seni Visual membantu untuk penulisan, budaya dan komunikasi visual.","Program tertentu mungkin memerlukan temu duga, ujian atau portfolio."],
    stpm:["Bahasa Melayu","Sejarah, Ekonomi atau Pengajian Perniagaan","MUET yang kukuh untuk bidang komunikasi profesional"],
    target:"Sasarkan PNGK 3.00 ke atas, MUET yang baik dan bina hasil penulisan atau media yang menunjukkan kemahiran sebenar.",
    official:"Pilih pengkhususan sebenar seperti linguistik, kewartawanan, penyiaran, perhubungan awam atau komunikasi digital sebelum membandingkan syarat.",
    source:"https://masscomm.uitm.edu.my/"
  },
  bina: {
    name:"Alam Bina, Seni Bina & Ukur", course:"Seni Bina / Ukur Bahan / Perancangan Bandar / Seni Bina Landskap / Geomatik / Hartanah", stream:"Program berbeza menerima aliran Sains, Teknikal atau Sains Sosial mengikut syarat khas.",
    spm:["Matematik lazimnya diberi perhatian; Matematik Tambahan dan Fizik membantu bagi program teknikal.","Seni Visual membantu untuk seni bina dan reka bentuk tetapi tidak menggantikan syarat akademik.","Portfolio, ujian lukisan atau temu duga mungkin diperlukan oleh program tertentu."],
    stpm:["Mathematics atau subjek yang diterima program","Physics bagi laluan teknikal tertentu","Seni Visual, Ekonomi atau Sejarah bagi laluan yang menerimanya"],
    target:"Sasarkan PNGK 3.00 ke atas dan semak awal sama ada program memerlukan portfolio, temu duga atau subjek Matematik tertentu.",
    official:"Seni Bina, Ukur Bahan, Perancangan Bandar dan Geomatik ialah program berbeza dengan kelayakan profesional serta syarat tersendiri.",
    source:"https://builtsurvey.utm.my/academic/undergraduate/quantity-surveying/"
  },
  hospitaliti: {
    name:"Hospitaliti, Pelancongan & Acara", course:"Pengurusan Hotel / Pelancongan / Seni Kulinari / Pengurusan Acara / Perkhidmatan Makanan", stream:"Terbuka kepada pelbagai aliran bergantung pada universiti dan program.",
    spm:["Bahasa Melayu dan Sejarah perlu memenuhi syarat am.","Bahasa Inggeris, Matematik dan kemahiran komunikasi membantu dalam industri perkhidmatan.","Sesetengah program kulinari atau hospitaliti mempunyai latihan praktikal dan syarat kesihatan tertentu."],
    stpm:["Pengajian Perniagaan","Ekonomi, Bahasa Melayu atau Sejarah","MUET untuk komunikasi pelanggan dan industri"],
    target:"Sasarkan PNGK 3.00 ke atas serta bina pengalaman dalam komunikasi, organisasi acara dan kerja berpasukan.",
    official:"Semak sama ada program berfokus pengurusan hotel, pelancongan, acara, kulinari atau perkhidmatan makanan.",
    source:"https://fhtm.uitm.edu.my/"
  },
  logistik: {
    name:"Logistik, Pengangkutan & Rantaian Bekalan", course:"Logistik / Pengangkutan / Rantaian Bekalan / Operasi / Maritim / Pengurusan Pelabuhan", stream:"Terbuka kepada aliran Sains atau Sains Sosial mengikut program.",
    spm:["Matematik penting untuk analisis operasi, kos dan inventori.","Bahasa Inggeris membantu kerana bidang ini melibatkan perdagangan dan dokumentasi antarabangsa.","Geografi, Ekonomi dan Pengajian Perniagaan memberi asas yang berguna."],
    stpm:["Ekonomi","Pengajian Perniagaan","Mathematics, Geografi atau subjek yang diterima program"],
    target:"Sasarkan PNGK 3.00 ke atas dan kukuhkan kemahiran Matematik, data, komunikasi serta penyelesaian masalah.",
    official:"Bezakan program pengurusan logistik daripada kejuruteraan pengangkutan atau bidang maritim yang mungkin memerlukan aliran Sains.",
    source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local"
  },
  sosial: {
    name:"Sains Sosial & Kemanusiaan", course:"Geografi / Sains Pembangunan / Antropologi & Sosiologi / Sejarah / Sains Sosial", stream:"Sesuai untuk aliran Sains Sosial dan juga sebahagian pelajar aliran Sains, bergantung pada universiti.",
    spm:["Bahasa Melayu dan Sejarah sering menjadi sebahagian syarat am universiti.","Bahasa Inggeris penting untuk pembacaan akademik dan penyelidikan.","Geografi, Ekonomi, Sejarah dan Pengajian Perniagaan memberi asas yang relevan."],
    stpm:["Pengajian Am","Sejarah / Geografi / Ekonomi / Pengajian Perniagaan atau subjek lain yang diterima program","MUET mengikut universiti"],
    target:"Sasarkan PNGK sekurang-kurangnya 3.00 untuk lebih banyak pilihan. Bezakan syarat minimum universiti daripada persaingan sebenar semasa UPU.",
    official:"UM Bachelor of Arts History mensyaratkan PNGK minimum 3.00 serta minimum B- dalam dua subjek STPM; program Geografi, Sains Pembangunan, Antropologi & Sosiologi di UKM dan Sains Sosial di USM tidak menerbitkan angka PNGK khusus.",
    source:"https://study.um.edu.my/bachelor-of-arts-history"
  },
  media: {
    name:"Media, Komunikasi & Industri Kreatif", course:"Komunikasi Media / Kewartawanan / Perhubungan Awam / Penyiaran / Media Baharu / Komunikasi Strategik / Kandungan Kreatif", stream:"Terbuka kepada pelbagai aliran tertakluk syarat program dan universiti.",
    spm:["Bahasa Melayu dan Bahasa Inggeris penting untuk penulisan dan komunikasi.","Sesetengah universiti meletakkan syarat temu duga atau penilaian tambahan."],
    stpm:["Program komunikasi biasanya menerima pelbagai kombinasi STPM tertakluk syarat khas.","MUET perlu disemak mengikut universiti dan program."],
    target:"Sasarkan PNGK 3.00 ke atas untuk pilihan lebih luas. Portfolio, penulisan, komunikasi dan pengalaman kokurikulum boleh membantu untuk bidang kreatif/media.",
    official:"UKM Media Communication dan USM Bachelor of Communication (dengan pengkhususan Digital, Strategic, Creative Screen dan Journalism) tidak menerbitkan angka PNGK khusus; UiTM menawarkan ijazah khusus berasingan bagi Journalism, PR, Broadcasting, Advertising, Publishing dan New Media Communication.",
    source:"https://www.ukm.my/studyukm/media-communications-bachelor-of-social-sciences-hons/"
  }
} as const;

type CareerKey=keyof typeof careers;
type PackageKey="p1"|"p2"|"p3"|"p4"|"p5"|"p6"|"p7"|"p8";
type PackageInfo={name:string;stream:string;subjects:string[];fields:{name:string;courses:string;careers:string}[];note:string};
const packages:Record<PackageKey,PackageInfo>={
 p1:{name:"Pakej 1",stream:"Aliran Sains",subjects:["Pengajian Am","Physics","Chemistry","Mathematics","MUET"],fields:[
  {name:"Kejuruteraan & Teknologi",courses:"Kejuruteraan Elektrik, Mekanikal, Awam, Kimia atau Mekatronik",careers:"Jurutera, pegawai teknikal, penyelidik"},
  {name:"Komputer & Data",courses:"Sains Komputer, Teknologi Maklumat, Kejuruteraan Perisian, Sains Data",careers:"Pembangun perisian, penganalisis data, keselamatan siber"},
  {name:"Sains Fizikal",courses:"Fizik, Kimia, Sains Bahan atau Geosains",careers:"Pegawai sains, ahli fizik, ahli kimia, penyelidik"},
  {name:"Matematik, Statistik & Aktuari",courses:"Matematik, Statistik, Sains Aktuari atau Matematik Industri",careers:"Ahli statistik, aktuari, penganalisis kuantitatif, penganalisis data"}
 ],note:"Pakej ini paling sesuai untuk bidang berasaskan Physics dan Mathematics. Program kesihatan yang mewajibkan Biology STPM perlu disemak dengan teliti."},
 p2:{name:"Pakej 2",stream:"Aliran Sains",subjects:["Pengajian Am","Biology","Chemistry","Mathematics","MUET"],fields:[
  {name:"Kesihatan & Klinikal",courses:"Perubatan, Farmasi, Pergigian atau Sains Kesihatan",careers:"Doktor, pegawai farmasi, pegawai sains kesihatan"},
  {name:"Biologi Gunaan",courses:"Bioteknologi, Bioperubatan, Mikrobiologi, Sains Makanan",careers:"Pegawai penyelidik, ahli mikrobiologi, pegawai makmal"},
  {name:"Alam Sekitar & Pertanian",courses:"Sains Alam Sekitar, Sains Pertanian, Perhutanan atau Pemakanan",careers:"Pegawai alam sekitar, pegawai pertanian, penyelidik"},
  {name:"Matematik, Statistik & Aktuari",courses:"Matematik, Statistik, Sains Aktuari atau Analitik Kuantitatif",careers:"Ahli statistik, aktuari, penganalisis risiko, penganalisis data"}
 ],note:"Pakej utama untuk bidang Biology dan Chemistry. Sesetengah program perubatan atau kesihatan turut menyemak Physics pada peringkat SPM."},
 p3:{name:"Pakej 3",stream:"Aliran Sains Sosial",subjects:["Pengajian Am","Sains Sukan","Pengajian Perniagaan","Sejarah","MUET"],fields:[
  {name:"Sukan",courses:"Sains Sukan, Pengurusan Sukan, Kejurulatihan atau Rekreasi",careers:"Pegawai sukan, jurulatih, pengurus acara sukan"},
  {name:"Perniagaan & Pengurusan",courses:"Pentadbiran Perniagaan, Pengurusan, Pemasaran atau Sumber Manusia",careers:"Pegawai pentadbiran, eksekutif pemasaran, pegawai HR"},
  {name:"Pendidikan & Sains Sosial",courses:"Pendidikan, Sejarah, Sains Politik atau Pentadbiran Awam",careers:"Guru, pegawai kerajaan, penyelidik sosial"}
 ],note:"Gabungan ini menghubungkan bidang sukan dengan pengurusan dan kemahiran kemanusiaan."},
 p4:{name:"Pakej 4",stream:"Aliran Sains Sosial",subjects:["Pengajian Am","Syariah","Sains Sukan","Sejarah","MUET"],fields:[
  {name:"Pengajian Islam & Syariah",courses:"Syariah, Usuluddin, Pengajian Islam atau Muamalat",careers:"Pegawai hal ehwal Islam, pegawai syariah, penyelidik"},
  {name:"Undang-undang & Pentadbiran",courses:"Undang-undang, Pentadbiran Awam atau Sains Politik",careers:"Peguam, pegawai pentadbiran, pegawai penguat kuasa"},
  {name:"Sukan & Pendidikan",courses:"Sains Sukan, Pengurusan Sukan atau Pendidikan",careers:"Guru, pegawai sukan, jurulatih"}
 ],note:"Untuk program Undang-undang Sivil atau Syariah, rujuk syarat Bahasa Inggeris, Bahasa Arab, MUET dan temu duga universiti."},
 p5:{name:"Pakej 5",stream:"Aliran Sains Sosial",subjects:["Pengajian Am","Pengajian Perniagaan","Ekonomi","Sejarah","MUET"],fields:[
  {name:"Ekonomi & Kewangan",courses:"Ekonomi, Kewangan, Perbankan atau Ekonomi Perniagaan",careers:"Pegawai ekonomi, pegawai bank, penganalisis kewangan"},
  {name:"Perniagaan",courses:"Pentadbiran Perniagaan, Pemasaran, Keusahawanan atau Sumber Manusia",careers:"Eksekutif perniagaan, usahawan, pegawai HR"},
  {name:"Perakaunan & Pentadbiran",courses:"Perakaunan, Pengurusan Awam, Hubungan Antarabangsa atau Sejarah",careers:"Akauntan, pegawai pentadbiran, pegawai diplomatik"}
 ],note:"Sesetengah program Perakaunan, Kewangan dan Ekonomi menetapkan gred minimum Matematik atau Matematik Tambahan pada peringkat SPM."},
 p6:{name:"Pakej 6",stream:"Aliran Sains Sosial",subjects:["Pengajian Am","Bahasa Melayu","Ekonomi","Sejarah","MUET"],fields:[
  {name:"Bahasa & Komunikasi",courses:"Bahasa Melayu, Linguistik, Komunikasi, Kewartawanan atau Media",careers:"Editor, wartawan, pegawai komunikasi, penulis"},
  {name:"Ekonomi & Pentadbiran",courses:"Ekonomi, Pentadbiran Awam, Pembangunan Manusia atau Sains Politik",careers:"Pegawai ekonomi, pegawai kerajaan, penyelidik"},
  {name:"Pendidikan & Kemanusiaan",courses:"Pendidikan Bahasa Melayu, Pendidikan Sejarah atau Sejarah",careers:"Guru, pegawai bahasa, kurator"}
 ],note:"Gabungan Bahasa Melayu, Ekonomi dan Sejarah sesuai untuk bidang bahasa, kemanusiaan dan pentadbiran."},
 p7:{name:"Pakej 7",stream:"Aliran Sains Sosial",subjects:["Pengajian Am","Seni Visual","Bahasa Melayu","Sejarah","MUET"],fields:[
  {name:"Seni & Reka Bentuk",courses:"Seni Halus, Reka Bentuk Grafik, Animasi atau Multimedia Kreatif",careers:"Pereka grafik, animator, ilustrator, pengarah seni"},
  {name:"Bahasa & Media",courses:"Komunikasi, Media, Bahasa Melayu atau Penulisan Kreatif",careers:"Pegawai media, editor, penulis kandungan"},
  {name:"Pendidikan & Warisan",courses:"Pendidikan Seni, Pendidikan Bahasa Melayu, Sejarah atau Pengurusan Warisan",careers:"Guru, kurator, pegawai kebudayaan"}
 ],note:"Program seni dan reka bentuk tertentu mungkin meminta portfolio, ujian melukis atau temu duga."},
 p8:{name:"Pakej 8",stream:"Aliran Sains Sosial",subjects:["Pengajian Am","Sains Sukan","Bahasa Melayu","Sejarah","MUET"],fields:[
  {name:"Sukan",courses:"Sains Sukan, Pengurusan Sukan, Kejurulatihan atau Rekreasi",careers:"Pegawai sukan, jurulatih, pengurus program"},
  {name:"Pendidikan",courses:"Pendidikan Jasmani, Pendidikan Bahasa Melayu atau Pendidikan Sejarah",careers:"Guru, jurulatih sekolah, pegawai pendidikan"},
  {name:"Komunikasi & Sains Sosial",courses:"Komunikasi, Pentadbiran Awam, Sejarah atau Pembangunan Manusia",careers:"Pegawai komunikasi, pegawai kerajaan, pegawai pembangunan"}
 ],note:"Syarat program Sains Sukan dan Pendidikan boleh melibatkan ujian kecergasan, MEdSI atau temu duga."}
};
type Grade="A+"|"A"|"A-"|"B+"|"B"|"C+"|"C"|"D"|"E"|"G";
type SpmRule={subject:string;minimum:Grade};
type Requirement={uni:string;program:string;pngk:number|null;merit?:number;spm:string;stpm:string;muet:string;extra:string;source:string;spmRules?:SpmRule[]};
const grades:Grade[]=["A+","A","A-","B+","B","C+","C","D","E","G"];
const engineeringBranches=[
 {name:"Kejuruteraan Awam",focus:"Struktur, jalan, jambatan, geoteknik dan pengurusan pembinaan",careers:"Jurutera struktur, tapak, geoteknik atau pengangkutan"},
 {name:"Kejuruteraan Mekanikal",focus:"Mesin, tenaga, haba, reka bentuk dan sistem pembuatan",careers:"Jurutera mekanikal, penyelenggaraan, reka bentuk atau loji"},
 {name:"Kejuruteraan Elektrik",focus:"Kuasa, mesin elektrik, grid, tenaga dan sistem kawalan",careers:"Jurutera kuasa, tenaga, kawalan atau perlindungan"},
 {name:"Kejuruteraan Elektronik",focus:"Litar, mikroelektronik, instrumentasi dan sistem terbenam",careers:"Jurutera elektronik, instrumentasi, cip atau ujian"},
 {name:"Kejuruteraan Kimia",focus:"Proses industri, pemisahan, tindak balas, keselamatan dan loji",careers:"Jurutera proses, pengeluaran, keselamatan atau kualiti"},
 {name:"Kejuruteraan Komputer",focus:"Perkakasan, rangkaian, sistem terbenam dan integrasi perisian",careers:"Jurutera komputer, rangkaian, IoT atau sistem"},
 {name:"Kejuruteraan Mekatronik",focus:"Gabungan mekanikal, elektronik, kawalan dan pengaturcaraan",careers:"Jurutera automasi, robotik, kawalan atau integrasi"},
 {name:"Kejuruteraan Pembuatan",focus:"Proses pengeluaran, automasi, kualiti dan reka bentuk kilang",careers:"Jurutera pembuatan, proses, kualiti atau industri"},
 {name:"Kejuruteraan Bahan",focus:"Logam, polimer, seramik, komposit dan kegagalan bahan",careers:"Jurutera bahan, metalurgi, kakisan atau jaminan kualiti"},
 {name:"Kejuruteraan Aeroangkasa",focus:"Aerodinamik, struktur pesawat, pendorongan dan avionik",careers:"Jurutera aeroangkasa, struktur, penyelenggaraan atau avionik"},
 {name:"Kejuruteraan Automotif",focus:"Kenderaan, enjin, casis, sistem elektrik dan mobiliti baharu",careers:"Jurutera automotif, ujian, reka bentuk atau pengeluaran"},
 {name:"Kejuruteraan Bioperubatan",focus:"Peralatan perubatan, biomekanik, isyarat dan teknologi klinikal",careers:"Jurutera bioperubatan, klinikal, peranti atau servis teknikal"},
 {name:"Kejuruteraan Alam Sekitar",focus:"Air, sisa, pencemaran, rawatan dan kelestarian",careers:"Jurutera alam sekitar, air, sisa atau pematuhan"},
 {name:"Kejuruteraan Petroleum",focus:"Reservoir, penggerudian, pengeluaran dan operasi minyak dan gas",careers:"Jurutera reservoir, penggerudian, pengeluaran atau operasi"},
 {name:"Kejuruteraan Marin",focus:"Kapal, struktur luar pesisir, pendorongan dan sistem marin",careers:"Jurutera marin, kapal, luar pesisir atau penyelenggaraan"},
 {name:"Kejuruteraan Telekomunikasi",focus:"Komunikasi tanpa wayar, gentian optik, antena dan rangkaian",careers:"Jurutera telekomunikasi, RF, rangkaian atau transmisi"}
];
const healthBranches=[
 {name:"Perubatan",study:"Diagnosis, rawatan, kesihatan manusia dan latihan klinikal",careers:"Doktor perubatan; pengkhususan dibuat selepas latihan asas"},
 {name:"Perubatan Veterinar",study:"Kesihatan, penyakit, pembedahan dan kebajikan haiwan",careers:"Doktor veterinar, pegawai veterinar atau penyelidik"},
 {name:"Pergigian",study:"Kesihatan mulut, gigi, rahang dan rawatan klinikal",careers:"Doktor pergigian; boleh melanjutkan pengkhususan"},
 {name:"Farmasi",study:"Ubat, farmakologi, formulasi, keselamatan dan penjagaan pesakit",careers:"Pegawai farmasi hospital, komuniti, industri atau regulatori"},
 {name:"Kejururawatan",study:"Penjagaan pesakit, kesihatan komuniti dan amalan klinikal",careers:"Jururawat berdaftar dan bidang kejururawatan khusus"},
 {name:"Fisioterapi",study:"Pergerakan, pemulihan fungsi, kecederaan dan senaman terapeutik",careers:"Ahli fisioterapi hospital, rehabilitasi atau sukan"},
 {name:"Terapi Carakerja",study:"Membantu pesakit kembali melakukan aktiviti harian dengan selamat",careers:"Ahli terapi carakerja dalam rehabilitasi dan komuniti"},
 {name:"Pengimejan Perubatan",study:"Radiografi, pengimejan diagnostik dan keselamatan radiasi",careers:"Juru X-ray atau pegawai pengimejan perubatan"},
 {name:"Optometri",study:"Penglihatan, pemeriksaan mata dan pengurusan masalah visual",careers:"Pegawai optometri atau optometris klinikal"},
 {name:"Dietetik & Pemakanan",study:"Pemakanan klinikal, perancangan diet dan kesihatan komuniti",careers:"Pegawai dietetik, pegawai pemakanan atau penyelidik"},
 {name:"Sains Bioperubatan",study:"Penyakit manusia, biologi molekul, patologi dan penyelidikan makmal",careers:"Pegawai sains, penyelidik atau pegawai makmal"},
 {name:"Teknologi Makmal Perubatan",study:"Analisis sampel klinikal untuk membantu diagnosis",careers:"Juruteknologi makmal perubatan"},
 {name:"Kesihatan Persekitaran",study:"Kesihatan awam, kawalan penyakit dan risiko persekitaran",careers:"Pegawai kesihatan persekitaran atau kesihatan awam"},
 {name:"Pertuturan & Audiologi",study:"Komunikasi, pertuturan, bahasa, pendengaran dan rehabilitasi",careers:"Ahli terapi pertuturan-bahasa atau pegawai audiologi"}
];
type Branch={name:string;study:string;careers:string};
const toBranches=(items:{name:string;focus:string;careers:string}[]):Branch[]=>items.map(x=>({name:x.name,study:x.focus,careers:x.careers}));
const careerBranches:Record<CareerKey,Branch[]>={
 peguam:[
  {name:"Undang-undang Sivil",study:"Kontrak, tort, harta, prosedur dan penyelesaian pertikaian",careers:"Peguam bela dan peguam cara, pegawai undang-undang"},
  {name:"Undang-undang Syariah",study:"Fiqh, keluarga Islam, muamalat dan prosedur mahkamah syariah",careers:"Peguam syarie, pegawai syariah, penyelidik"},
  {name:"Undang-undang Korporat",study:"Syarikat, transaksi, pematuhan dan tadbir urus",careers:"Peguam korporat, pegawai pematuhan, setiausaha korporat"},
  {name:"Undang-undang Jenayah",study:"Kesalahan, bukti, prosedur dan keadilan jenayah",careers:"Timbalan pendakwa raya, peguam litigasi, pegawai penyiasatan"},
  {name:"Teknologi, Data & AI",study:"Privasi, data, harta intelek, keselamatan siber dan tadbir urus AI",careers:"Peguam teknologi, pegawai privasi data, pakar dasar AI"},
  {name:"Undang-undang Antarabangsa",study:"Hak asasi, perdagangan, diplomasi dan organisasi antarabangsa",careers:"Pegawai diplomatik, penasihat dasar, pegawai organisasi antarabangsa"},
  {name:"Undang-undang Alam Sekitar",study:"Peraturan alam sekitar, iklim dan sumber semula jadi",careers:"Peguam alam sekitar, pegawai dasar kelestarian"},
  {name:"Kriminologi & Penguatkuasaan",study:"Jenayah, sistem keadilan, penyiasatan dan pencegahan",careers:"Pegawai penguat kuasa, penganalisis jenayah, penyelidik"}
 ],
 doktor:healthBranches,
 akauntan:[
  {name:"Perakaunan Profesional",study:"Pelaporan, audit, cukai dan piawaian perakaunan",careers:"Akauntan, juruaudit, perunding cukai"},
  {name:"Kewangan",study:"Pelaburan, pasaran modal, risiko dan kewangan korporat",careers:"Penganalisis kewangan, pegawai pelaburan, pengurus risiko"},
  {name:"Perbankan & Kewangan Islam",study:"Operasi bank, kredit, syariah dan produk kewangan",careers:"Pegawai bank, penasihat syariah, penganalisis kredit"},
  {name:"Teknologi Kewangan",study:"Pembayaran digital, blockchain, data dan automasi kewangan",careers:"Penganalisis fintech, pengurus produk digital, pegawai pematuhan teknologi"},
  {name:"Percukaian",study:"Cukai individu, syarikat, pematuhan dan perancangan cukai",careers:"Eksekutif cukai, perunding cukai, pegawai pematuhan"},
  {name:"Analitik Perniagaan",study:"Data, visualisasi, ramalan dan keputusan perniagaan",careers:"Penganalisis perniagaan, penganalisis data, perunding"},
  {name:"Forensik Kewangan",study:"Siasatan penipuan, transaksi dan bukti kewangan",careers:"Akauntan forensik, penyiasat fraud, juruaudit dalaman"},
  {name:"Ekonomi",study:"Pasaran, dasar, pembangunan dan analisis kuantitatif",careers:"Ahli ekonomi, penganalisis dasar, penyelidik"}
 ],
 jurutera:toBranches(engineeringBranches),
 guru:[
  {name:"Pendidikan Sains & Matematik",study:"Pedagogi, kandungan mata pelajaran dan penilaian",careers:"Guru Physics, Chemistry, Biology atau Mathematics"},
  {name:"Pendidikan Bahasa",study:"Bahasa, linguistik, kesusasteraan dan kaedah mengajar",careers:"Guru Bahasa Melayu atau Bahasa Inggeris, pegawai bahasa"},
  {name:"Pendidikan Khas",study:"Keperluan pembelajaran, intervensi dan pendidikan inklusif",careers:"Guru pendidikan khas, pegawai intervensi"},
  {name:"Bimbingan & Kaunseling",study:"Perkembangan, kaunseling, kerjaya dan kesejahteraan pelajar",careers:"Guru bimbingan dan kaunseling, kaunselor selepas kelayakan profesional"},
  {name:"Teknologi Pendidikan & AI",study:"Reka bentuk pembelajaran, media, data pendidikan dan penggunaan AI",careers:"Pereka instruksional, pegawai teknologi pendidikan, pembangun kandungan"},
  {name:"Pendidikan Awal Kanak-kanak",study:"Perkembangan, kurikulum dan pembelajaran awal",careers:"Pendidik awal kanak-kanak, penyelaras program"},
  {name:"Pendidikan Sukan",study:"Pedagogi sukan, kecergasan, kejurulatihan dan kesihatan",careers:"Guru Pendidikan Jasmani, jurulatih, pegawai sukan"},
  {name:"TESL",study:"Bahasa Inggeris, linguistik dan pedagogi",careers:"Guru Bahasa Inggeris, jurulatih bahasa, pembangun bahan"}
 ],
 psikologi:[
  {name:"Psikologi",study:"Tingkah laku, kognitif, perkembangan, sosial dan penyelidikan",careers:"Pegawai psikologi, penyelidik, pegawai pembangunan manusia"},
  {name:"Kaunseling",study:"Teori, kemahiran kaunseling, etika dan praktikum",careers:"Kaunselor berdaftar selepas memenuhi syarat profesional"},
  {name:"Pembangunan Manusia",study:"Perkembangan sepanjang hayat, keluarga dan komuniti",careers:"Pegawai pembangunan, pegawai kebajikan, penyelidik"},
  {name:"Kerja Sosial",study:"Intervensi individu, keluarga, komuniti dan dasar sosial",careers:"Pegawai kerja sosial, pegawai kebajikan, pengurus kes"},
  {name:"Psikologi Industri",study:"Tingkah laku organisasi, pemilihan, latihan dan prestasi",careers:"Pegawai sumber manusia, penganalisis bakat, perunding organisasi"},
  {name:"Neurosains Kognitif",study:"Otak, kognisi, data eksperimen dan tingkah laku",careers:"Pembantu penyelidik, pegawai sains, penyelidik lanjutan"},
  {name:"Pengalaman Pengguna",study:"Penyelidikan pengguna, tingkah laku dan reka bentuk produk",careers:"Penyelidik UX, pereka perkhidmatan, penganalisis produk"},
  {name:"Sains Tingkah Laku & Data",study:"Eksperimen, statistik dan analisis pola manusia",careers:"Penganalisis tingkah laku, penyelidik pasaran, penganalisis data sosial"}
 ],
 farmasi:healthBranches,
 teknologi:[
  {name:"Kecerdasan Buatan",study:"Pembelajaran mesin, model AI, visi komputer, bahasa dan etika",careers:"Jurutera AI, jurutera pembelajaran mesin, pakar AI gunaan"},
  {name:"Sains Data",study:"Statistik, pengaturcaraan, pangkalan data dan pemodelan",careers:"Saintis data, penganalisis data, jurutera data"},
  {name:"Sains Komputer",study:"Algoritma, sistem, teori pengkomputeran dan perisian",careers:"Pembangun perisian, jurutera sistem, penyelidik komputasi"},
  {name:"Kejuruteraan Perisian",study:"Reka bentuk, pembangunan, ujian dan operasi perisian",careers:"Jurutera perisian, jurutera DevOps, jurutera jaminan kualiti"},
  {name:"Keselamatan Siber",study:"Rangkaian, kriptografi, pertahanan dan forensik digital",careers:"Penganalisis keselamatan, penguji keselamatan, penyiasat digital"},
  {name:"Robotik & Automasi",study:"Kawalan, sensor, AI, perkakasan dan sistem autonomi",careers:"Jurutera robotik, automasi, sistem autonomi"},
  {name:"Pengkomputeran Awan",study:"Sistem teragih, rangkaian, platform dan kebolehpercayaan",careers:"Jurutera awan, jurutera platform, jurutera kebolehpercayaan"},
  {name:"Interaksi Manusia-Komputer",study:"UX, antara muka, psikologi pengguna dan prototaip",careers:"Pereka UX/UI, penyelidik UX, pereka produk digital"},
  {name:"Bioinformatik",study:"Biologi, data genomik, statistik dan pengaturcaraan",careers:"Penganalisis bioinformatik, pegawai penyelidik"},
  {name:"Sistem Maklumat",study:"Teknologi, proses organisasi, data dan pengurusan projek",careers:"Penganalisis sistem, perunding teknologi, pengurus produk"}
 ],
 sains:[
  {name:"Fizik",study:"Mekanik, bahan, elektronik, optik dan pemodelan",careers:"Pegawai sains, penyelidik, ahli fizik perubatan selepas pengajian lanjut"},
  {name:"Kimia",study:"Analisis, sintesis, bahan dan proses",careers:"Ahli kimia, pegawai makmal, pegawai kualiti"},
  {name:"Biologi",study:"Organisma, ekologi, genetik dan sel",careers:"Pegawai sains, ahli biologi, penyelidik"},
  {name:"Sains Nuklear",study:"Fizik nuklear, radiasi, pengesanan, keselamatan dan aplikasi industri",careers:"Pegawai sains nuklear, pegawai perlindungan radiasi, penyelidik"},
  {name:"Sains Bahan",study:"Logam, polimer, semikonduktor dan bahan nano",careers:"Pegawai bahan, penyelidik semikonduktor, pegawai kualiti"},
  {name:"Geosains",study:"Bumi, mineral, geofizik dan pemetaan",careers:"Ahli geologi, pegawai geosains, penganalisis GIS"},
  {name:"Sains Angkasa",study:"Astronomi, atmosfera, penderiaan jauh dan data",careers:"Pegawai penyelidik, penganalisis satelit, komunikator sains"},
  {name:"Sains Forensik",study:"Kimia, biologi, bukti dan kaedah analisis",careers:"Pegawai sains forensik, pegawai makmal"}
 ],
 perniagaan:[
  {name:"Ekonomi",study:"Mikro, makro, ekonometrik dan dasar",careers:"Ahli ekonomi, penganalisis dasar, penyelidik"},
  {name:"Pengurusan",study:"Strategi, operasi, organisasi dan kepimpinan",careers:"Eksekutif pengurusan, perunding, pengurus operasi"},
  {name:"Pemasaran Digital",study:"Jenama, pengguna, kandungan, data dan platform digital",careers:"Eksekutif pemasaran digital, pengurus jenama, penganalisis pemasaran"},
  {name:"Sumber Manusia",study:"Bakat, latihan, hubungan industri dan analitik tenaga kerja",careers:"Pegawai HR, perekrut, penganalisis bakat"},
  {name:"Rantaian Bekalan",study:"Logistik, perolehan, inventori dan pengoptimuman",careers:"Penganalisis rantaian bekalan, pegawai logistik, perancang permintaan"},
  {name:"Keusahawanan",study:"Model perniagaan, inovasi, kewangan dan pertumbuhan",careers:"Usahawan, pengurus inovasi, pegawai pembangunan perniagaan"},
  {name:"Analitik Perniagaan & AI",study:"Data, automasi, ramalan dan keputusan",careers:"Penganalisis perniagaan, penganalisis produk, perunding AI perniagaan"},
  {name:"Perniagaan Antarabangsa",study:"Perdagangan, pasaran global dan operasi rentas negara",careers:"Pegawai perdagangan, eksekutif eksport, penganalisis pasaran"}
 ],
 kreatif:[
  {name:"Seni Halus",study:"Lukisan, arca, cetakan, fotografi, teori seni dan amalan studio",careers:"Artis, kurator, art educator, gallery assistant, creative practitioner"},
  {name:"Reka Bentuk Grafik & Komunikasi Visual",study:"Tipografi, identiti visual, ilustrasi, branding, editorial dan reka bentuk digital",careers:"Graphic designer, visual designer, art director, brand designer"},
  {name:"Reka Bentuk Industri",study:"Product design, ergonomik, bahan, prototaip, CAD dan inovasi produk",careers:"Industrial designer, product designer, design researcher"},
  {name:"Media Baharu & Multimedia Kreatif",study:"Interactive media, UX, AR/VR, animasi, web, aplikasi dan produksi digital",careers:"Multimedia designer, UX designer, interactive media designer, digital artist"},
  {name:"Seni Bina",study:"Reka bentuk bangunan, studio seni bina, teknologi binaan, sejarah dan alam bina",careers:"Architectural assistant, designer, visualiser, BIM assistant"},
  {name:"Seni Bina Landskap",study:"Perancangan ruang luar, reka bentuk landskap, ekologi, taman dan kelestarian",careers:"Landscape architect, landscape designer, urban landscape planner"},
  {name:"Animasi & Reka Bentuk Permainan",study:"Animasi 2D/3D, concept art, storytelling, game design, interaction dan produksi digital",careers:"Animator, game designer, concept artist, technical artist"}
 ],
 kesihatanbersekutu:[
  {name:"Sains Bioperubatan",study:"Anatomi, fisiologi, mikrobiologi, patologi, biologi molekul, farmakologi dan diagnostik makmal",careers:"Pegawai sains bioperubatan, medical laboratory technologist, penyelidik"},
  {name:"Dietetik",study:"Pemakanan klinikal, penilaian diet, penyakit, kaunseling diet dan praktikum hospital",careers:"Dietitian, clinical dietitian, community dietitian"},
  {name:"Pemakanan & Kesihatan Komuniti",study:"Pemakanan, promosi kesihatan, epidemiologi, intervensi komuniti dan gaya hidup sihat",careers:"Nutritionist, community health officer, health promotion officer"},
  {name:"Fisioterapi",study:"Anatomi, biomekanik, rehabilitasi, muskuloskeletal, neurologi dan rawatan fizikal",careers:"Physiotherapist, rehabilitation officer, sports physiotherapy practitioner"},
  {name:"Terapi Cara Kerja",study:"Aktiviti harian, rehabilitasi fizikal/mental, ergonomik, pediatrik dan komuniti",careers:"Occupational therapist, care manager, ergonomist"},
  {name:"Pengimejan Diagnostik & Radioterapi",study:"X-ray, CT, MRI, ultrasound, nuclear medicine dan radioterapi",careers:"Diagnostic radiographer, radiation therapist, imaging technologist"},
  {name:"Audiologi",study:"Pendengaran, keseimbangan, penilaian audiologi, alat bantuan dengar dan rehabilitasi",careers:"Audiologist, hearing rehabilitation specialist"},
  {name:"Kesihatan Alam Sekitar & Pekerjaan",study:"Kesihatan persekitaran, occupational safety, risiko, pencemaran dan pencegahan",careers:"Environmental health officer, occupational safety and health officer"}
 ],
 alam:[
  {name:"Pengurusan Alam Sekitar",study:"Dasar, undang-undang, EIA, ekonomi, sumber, pengurusan projek dan pembangunan lestari",careers:"Pegawai alam sekitar, environmental officer, sustainability executive, pegawai EIA"},
  {name:"Sains & Teknologi Alam Sekitar",study:"Air, udara, tanah, pencemaran, toksikologi, analisis makmal, GIS dan teknologi rawatan",careers:"Environmental scientist, pegawai makmal, pegawai pemantauan, pegawai teknologi alam sekitar"},
  {name:"Konservasi & Sumber Semula Jadi",study:"Ekologi, biodiversiti, pengurusan sumber, pemuliharaan dan habitat",careers:"Pegawai konservasi, pegawai hidupan liar, pegawai taman, penyelidik ekologi"},
  {name:"Taman, Rekreasi & Perhutanan Bandar",study:"Pengurusan taman, rekreasi luar, sumber semula jadi, pelancongan alam dan perhutanan bandar",careers:"Pegawai taman, pegawai rekreasi, pengurus kawasan perlindungan, pegawai ecotourism"},
  {name:"Kesihatan Alam Sekitar & Pekerjaan",study:"Hubungan manusia-persekitaran, kesihatan pekerjaan, pencemaran, risiko dan keselamatan",careers:"Pegawai kesihatan persekitaran, OSH officer, pegawai kesihatan pekerjaan"},
  {name:"Kelestarian, GIS & Pengurusan Sumber",study:"Kelestarian, perubahan iklim, GIS, remote sensing, sumber, dasar dan data alam sekitar",careers:"Sustainability analyst, GIS analyst, climate officer, ESG/environment executive"}
 ],
 pentadbiran:[
  {name:"Sains Politik",study:"Sistem politik, teori politik, pilihan raya, pentadbiran, perbandingan politik dan politik antarabangsa",careers:"Pegawai penyelidik, penganalisis dasar, pegawai kerajaan, pegawai politik"},
  {name:"Pentadbiran & Pengurusan Awam",study:"Pentadbiran kerajaan, organisasi awam, kewangan awam, tadbir urus dan pengurusan",careers:"Pegawai tadbir, pegawai kerajaan tempatan, pegawai pentadbiran, pengurus sektor awam"},
  {name:"Hubungan Antarabangsa",study:"Politik dunia, dasar luar, organisasi antarabangsa, keselamatan dan diplomasi",careers:"Pegawai hal ehwal antarabangsa, pegawai diplomatik, penganalisis geopolitik"},
  {name:"Dasar Awam & Tadbir Urus",study:"Analisis dasar, penilaian program, pentadbiran, ekonomi politik dan tadbir urus",careers:"Penganalisis dasar, pegawai perancang, pegawai penyelidik, pegawai kementerian"},
  {name:"Diplomasi, Strategik & Keselamatan Antarabangsa",study:"Diplomasi, hubungan luar, keselamatan, pertahanan, strategi dan institusi antarabangsa",careers:"Pegawai diplomatik, pegawai hal ehwal luar, penganalisis strategik, pegawai organisasi antarabangsa"}
 ],
 pertanian:[
  {name:"Sains Pertanian",study:"Tanaman, tanah, perosak, pembiakbakaan, mekanisasi, agroiklim dan pertanian lestari",careers:"Pegawai pertanian, agronomis, pegawai penyelidik, pengurus ladang"},
  {name:"Sains Hortikultur",study:"Buah-buahan, sayuran, florikultur, landskap, fisiologi tanaman dan pascatuai",careers:"Pegawai hortikultur, pengurus nurseri, pegawai pertanian, usahawan agro"},
  {name:"Agribisnes",study:"Ekonomi pertanian, pemasaran, rantaian bekalan, kewangan dan pengurusan agro",careers:"Eksekutif agribisnes, pegawai pembangunan usahawan, penganalisis pasaran agro"},
  {name:"Perhutanan & Industri Kayu",study:"Pengurusan hutan, konservasi, ekologi hidupan liar, perladangan hutan dan industri kayu",careers:"Pegawai perhutanan, pegawai konservasi, pegawai industri kayu, pengurus taman"},
  {name:"Akuakultur & Perikanan",study:"Penternakan ikan/udang, kesihatan akuatik, nutrisi, kualiti air dan pengurusan sistem",careers:"Pegawai akuakultur, pegawai perikanan, pengurus hatchery, penyelidik"},
  {name:"Sains & Teknologi Makanan",study:"Kimia makanan, mikrobiologi makanan, pemprosesan, keselamatan dan pembangunan produk",careers:"Pegawai teknologi makanan, QA/QC, R&D makanan, pegawai keselamatan makanan"},
  {name:"Pengurusan Perladangan",study:"Tanaman perladangan, ekonomi, mekanisasi, tenaga kerja, rantaian bekalan dan pengurusan",careers:"Pengurus ladang, pegawai operasi, pegawai agronomi, pegawai syarikat perladangan"},
  {name:"Teknologi Pertanian Pintar",study:"Sensor, automasi, IoT, data, mekanisasi dan precision agriculture",careers:"Pegawai agroteknologi, penyelidik smart farming, pegawai teknologi ladang"}
 ],
 veterinar:[
  {name:"Doktor Perubatan Veterinar",study:"Anatomi, fisiologi, patologi, penyakit haiwan, farmakologi, pembedahan, klinikal dan kesihatan awam veterinar",careers:"Doktor veterinar, pegawai veterinar, pegawai kesihatan haiwan, penyelidik"},
  {name:"Sains Haiwan",study:"Nutrisi, pembiakbakaan, fisiologi, genetik, pengurusan dan pengeluaran haiwan",careers:"Pegawai sains haiwan, pegawai ternakan, penyelidik, pengurus ladang ternakan"},
  {name:"Kesihatan & Kebajikan Haiwan",study:"Kesihatan populasi, biosekuriti, kebajikan, pemakanan, pencegahan penyakit dan pengurusan",careers:"Pegawai kesihatan haiwan, pegawai biosekuriti, pegawai kebajikan haiwan"},
  {name:"Teknologi Penternakan & Pengeluaran Ternakan",study:"Teknologi ladang, pemakanan, pengeluaran, pembiakan, pengurusan ternakan dan produk haiwan",careers:"Pegawai teknologi penternakan, pengurus ladang, pegawai pengeluaran, usahawan ternakan"}
 ],
 marin:[
  {name:"Sains Marin",study:"Biologi marin, oseanografi fizikal/kimia/geologi, pencemaran, dasar dan pengurusan sumber laut",careers:"Ahli sains marin, pegawai taman laut, pegawai penyelidik, pegawai EIA"},
  {name:"Akuakultur",study:"Penternakan ikan/udang, nutrisi, kesihatan akuatik, hatchery, kualiti air dan sistem pengeluaran",careers:"Pegawai akuakultur, pengurus hatchery, pegawai perikanan, penyelidik"},
  {name:"Sains Perikanan",study:"Populasi ikan, ekologi, teknologi tangkapan, keselamatan hasil laut dan pengurusan perikanan",careers:"Pegawai perikanan, penyelidik sumber marin, pegawai pengurusan stok"},
  {name:"Biologi & Ekologi Akuatik",study:"Ekologi marin, plankton, invertebrata, terumbu karang, mikroorganisma dan biodiversiti",careers:"Ahli biologi marin, pegawai konservasi, pegawai penyelidik, aquarist"},
  {name:"Oseanografi & Iklim Laut",study:"Arus, gelombang, atmosfera-laut, iklim, geologi marin dan data oseanografi",careers:"Oseanografer, pegawai meteorologi marin, penyelidik iklim, pegawai data laut"},
  {name:"Teknologi Laut, GIS & Pengurusan Pantai",study:"Remote sensing, GIS, pemetaan pantai, EIA, pengurusan pesisir dan teknologi pemantauan",careers:"GIS analyst, marine surveyor, coastal management officer, environmental consultant"}
 ],
 kerjasosial:[
  {name:"Kerja Sosial",study:"Intervensi individu, keluarga, kumpulan dan komuniti; polisi sosial; etika; praktikum",careers:"Pegawai kerja sosial, pegawai kebajikan, pegawai perlindungan, pegawai NGO"},
  {name:"Pembangunan Komuniti",study:"Pemberdayaan komuniti, program sosial, kepimpinan, perancangan dan pembangunan setempat",careers:"Pegawai pembangunan komuniti, pegawai NGO, pegawai program, community development officer"},
  {name:"Pengurusan Pembangunan",study:"Perancangan pembangunan, pengurusan projek, ekonomi pembangunan, dasar dan tadbir urus",careers:"Pegawai pembangunan, pegawai perancang, project officer, policy analyst"},
  {name:"Pembangunan Manusia",study:"Perkembangan manusia, keluarga, komuniti, psikologi sosial, demografi dan perkhidmatan manusia",careers:"Pegawai pembangunan manusia, pegawai program sosial, penyelidik, pegawai komuniti"}
 ],
 maklumat:[
  {name:"Pengurusan Perpustakaan",study:"Organisasi maklumat, katalog, rujukan, pangkalan data, koleksi digital dan perkhidmatan pengguna",careers:"Pustakawan, information officer, reference librarian, digital librarian"},
  {name:"Pengurusan Rekod",study:"Rekod organisasi, arkib, electronic records, governance, preservation dan digital forensics",careers:"Records manager, archivist, document analyst, information governance officer"},
  {name:"Pengurusan Sistem Maklumat",study:"Sistem maklumat, pangkalan data, analisis proses, pengurusan maklumat dan teknologi organisasi",careers:"Information systems officer, business systems analyst, information manager"},
  {name:"Pengurusan Kandungan Maklumat",study:"Kandungan digital, metadata, web content, publishing, information architecture dan knowledge organisation",careers:"Content manager, digital curator, web content specialist, knowledge officer"},
  {name:"Arkib, Dokumentasi & Kurasi Digital",study:"Arkib, pemeliharaan, dokumentasi, oral history, cultural heritage dan digital preservation",careers:"Archivist, digital archivist, curator, heritage information officer"}
 ],
 sukan:[
  {name:"Sains Sukan",study:"Anatomi, fisiologi senaman, biomekanik, psikologi sukan, nutrisi dan analisis prestasi",careers:"Pegawai sains sukan, exercise specialist, sports performance analyst, strength & conditioning coach"},
  {name:"Pengurusan Sukan",study:"Organisasi, pemasaran, acara, kemudahan, kewangan dan industri sukan",careers:"Pengurus sukan, pegawai acara, sports marketing executive, facility manager"},
  {name:"Kesihatan & Kecergasan",study:"Fitness assessment, exercise programming, wellness, rehabilitation asas dan promosi kesihatan",careers:"Fitness specialist, wellness officer, personal trainer, health & fitness executive"},
  {name:"Pendidikan Sains Sukan",study:"Pedagogi, fisiologi, biomekanik, kurikulum, teknologi pengajaran dan penilaian",careers:"Guru selepas memenuhi syarat profesional, pegawai pendidikan sukan, jurulatih pendidikan"},
  {name:"Pendidikan Jasmani",study:"Pergerakan, pedagogi, kurikulum, kesihatan, rekreasi dan kaedah pengajaran",careers:"Guru Pendidikan Jasmani selepas memenuhi syarat ikhtisas, pegawai rekreasi"},
  {name:"Sains Kejurulatihan",study:"Perancangan latihan, analisis prestasi, motor learning, conditioning dan pembangunan atlet",careers:"Jurulatih, performance analyst, pegawai pembangunan atlet"}
 ],
 islam:[
  {name:"Syariah",study:"Fiqh, usul fiqh, keluarga Islam, muamalat, kehakiman dan undang-undang Islam",careers:"Pegawai syariah, pegawai hal ehwal Islam, penyelidik, pegawai mahkamah syariah"},
  {name:"Fiqh & Fatwa",study:"Fiqh klasik dan semasa, fatwa, maqasid syariah, istinbat dan isu hukum kontemporari",careers:"Pegawai fatwa, pegawai istinbat, pegawai penyelidik syariah, pegawai agama"},
  {name:"Usuluddin",study:"Aqidah, pemikiran Islam, al-Quran, hadis, spiritualiti dan perbandingan agama",careers:"Pegawai hal ehwal Islam, penyelidik, pendidik selepas kelayakan berkaitan"},
  {name:"Dakwah & Pembangunan Insan",study:"Komunikasi dakwah, psikologi, masyarakat, pembangunan insan dan media",careers:"Pegawai dakwah, pegawai pembangunan komuniti, pegawai agama, content specialist Islamik"},
  {name:"Muamalat & Kewangan Islam",study:"Kontrak, perbankan Islam, takaful, pasaran modal dan pematuhan syariah",careers:"Pegawai bank Islam, pegawai syariah, pegawai takaful, compliance executive"},
  {name:"Industri Halal",study:"Syariah, pensijilan halal, audit, sains makanan asas, logistik dan standard industri",careers:"Eksekutif halal, auditor halal, pegawai pematuhan, halal consultant"}
 ],
 bahasa:[
  {name:"Bahasa Melayu & Linguistik",study:"Tatabahasa, sosiolinguistik, wacana, budaya dan penyelidikan bahasa",careers:"Pegawai bahasa, editor, penyelidik, penulis"},
  {name:"Komunikasi Massa",study:"Teori media, penulisan, produksi, khalayak dan etika",careers:"Pegawai media, penerbit, penulis kandungan"},
  {name:"Kewartawanan",study:"Pelaporan, penyuntingan, penyelidikan, multimedia dan etika berita",careers:"Wartawan, penyunting, penerbit berita"},
  {name:"Perhubungan Awam",study:"Reputasi, kempen, komunikasi krisis dan pihak berkepentingan",careers:"Pegawai perhubungan awam, pegawai komunikasi korporat"},
  {name:"Penyiaran & Produksi",study:"Video, audio, skrip, pengarahan dan produksi studio",careers:"Penerbit, penulis skrip, kru produksi, penyunting video"},
  {name:"Media Baharu",study:"Kandungan digital, platform, analitik, interaktif dan strategi media",careers:"Penerbit kandungan digital, pegawai media sosial, penganalisis media"},
  {name:"Terjemahan",study:"Bahasa, makna, budaya, penyuntingan dan teknologi terjemahan",careers:"Penterjemah, editor bahasa, penyetempat kandungan"}
 ],
 bina:[
  {name:"Seni Bina",study:"Reka bentuk bangunan, studio, teknologi binaan, sejarah dan alam sekitar",careers:"Pembantu arkitek; gelaran profesional memerlukan laluan kelayakan lanjut"},
  {name:"Ukur Bahan",study:"Kos, kontrak, tender, bahan dan pengurusan pembinaan",careers:"Juruukur bahan, eksekutif kontrak, perunding kos"},
  {name:"Perancangan Bandar & Wilayah",study:"Guna tanah, pengangkutan, komuniti, GIS dan pembangunan bandar",careers:"Perancang bandar, pegawai pembangunan, penganalisis perancangan"},
  {name:"Seni Bina Landskap",study:"Reka bentuk ruang luar, tumbuhan, ekologi dan perancangan tapak",careers:"Pereka landskap, pegawai landskap, perunding reka bentuk"},
  {name:"Geomatik & Geoinformatik",study:"Ukur, pemetaan, GIS, dron, satelit dan data spatial",careers:"Juruukur geomatik, penganalisis GIS, pegawai geospatial"},
  {name:"Hartanah",study:"Penilaian, pasaran, undang-undang, pelaburan dan pengurusan aset",careers:"Penilai harta, eksekutif hartanah, pengurus fasiliti"},
  {name:"Pengurusan Pembinaan",study:"Projek, kos, masa, keselamatan, teknologi dan operasi tapak",careers:"Eksekutif projek, pengurus pembinaan, pegawai perancangan projek"}
 ],
 matematik:[
  {name:"Matematik",study:"Kalkulus, algebra, analisis, persamaan pembezaan, pengoptimuman dan pemodelan",careers:"Ahli matematik, penganalisis kuantitatif, penyelidik, penganalisis operasi"},
  {name:"Statistik",study:"Kebarangkalian, inferens, regresi, pensampelan, reka bentuk eksperimen dan analisis data",careers:"Ahli statistik, penganalisis data, penyelidik pasaran, pegawai analitik"},
  {name:"Sains Aktuari",study:"Matematik kewangan, statistik, risiko, insurans, pelaburan dan pemodelan aktuari",careers:"Aktuari, perunding aktuari, penganalisis risiko, penganalisis insurans"},
  {name:"Matematik Industri",study:"Pemodelan masalah industri, pengoptimuman, simulasi, komputasi dan operasi",careers:"Penganalisis operasi, penganalisis sistem, penganalisis kuantitatif"},
  {name:"Sains Data Kuantitatif",study:"Statistik, pengaturcaraan, pemodelan, pembelajaran mesin dan visualisasi data",careers:"Saintis data, penganalisis data, penganalisis produk"},
  {name:"Penyelidikan Operasi",study:"Pengoptimuman, simulasi, teori keputusan, logistik dan perancangan sumber",careers:"Penganalisis operasi, perancang rantaian bekalan, perunding analitik"},
  {name:"Matematik Kewangan",study:"Kewangan kuantitatif, derivatif, risiko, portfolio dan pemodelan stokastik",careers:"Penganalisis kuantitatif, penganalisis pelaburan, pengurus risiko"},
  {name:"Kriptografi & Matematik Komputasi",study:"Teori nombor, algoritma, keselamatan maklumat dan pengiraan saintifik",careers:"Penganalisis kriptografi, penyelidik keselamatan, pembangun algoritma"}
 ],
 senibina:[
  {name:"Senibina (Sarjana Muda Senibina / Sains Senibina)",study:"Reka bentuk bangunan, teori senibina, studio, teknologi binaan dan sejarah senibina",careers:"Pembantu arkitek; gelaran 'Arkitek' berdaftar memerlukan latihan praktikal dan peperiksaan Lembaga Arkitek Malaysia (LAM) selepas ijazah"},
  {name:"Seni Bina Landskap",study:"Reka bentuk ruang luar, tumbuhan, ekologi tapak dan perancangan landskap",careers:"Pereka landskap, pegawai landskap, perunding reka bentuk luar"},
  {name:"Senibina Dalaman",study:"Ruang dalaman, bahan, pencahayaan dan pengalaman pengguna dalam bangunan",careers:"Pereka dalaman, perunding ruang, pengurus projek reka bentuk"},
  {name:"Pengurusan Projek Pembinaan",study:"Kos, jadual, keselamatan dan koordinasi projek pembinaan berskala besar",careers:"Pengurus projek, eksekutif pembinaan, perunding kos"}
 ],
 hospitaliti:[
  {name:"Pengurusan Hotel",study:"Operasi penginapan, khidmat pelanggan, hasil dan pengurusan organisasi",careers:"Eksekutif hotel, pegawai operasi, pengurus perkhidmatan"},
  {name:"Pengurusan Pelancongan",study:"Destinasi, pemasaran, pelancong, produk dan pembangunan komuniti",careers:"Pegawai pelancongan, perancang produk, eksekutif destinasi"},
  {name:"Pengurusan Acara",study:"Perancangan, bajet, pemasaran, operasi dan pengurusan risiko acara",careers:"Eksekutif acara, penyelaras persidangan, pegawai protokol"},
  {name:"Seni Kulinari",study:"Teknik masakan, keselamatan makanan, menu, operasi dan kreativiti",careers:"Chef, penyelia dapur, usahawan makanan"},
  {name:"Perkhidmatan Makanan",study:"Operasi restoran, pemakanan asas, kualiti, kos dan keusahawanan",careers:"Pengurus perkhidmatan makanan, pegawai operasi, usahawan"},
  {name:"Pelancongan Digital",study:"Platform tempahan, kandungan, data pelanggan dan pemasaran destinasi",careers:"Eksekutif pemasaran pelancongan, pengurus kandungan, penganalisis pelanggan"}
 ],
 logistik:[
  {name:"Logistik & Rantaian Bekalan",study:"Perolehan, inventori, gudang, pengangkutan dan perancangan permintaan",careers:"Pegawai logistik, penganalisis rantaian bekalan, perancang inventori"},
  {name:"Pengangkutan",study:"Sistem jalan, rel, udara, operasi, dasar dan perancangan mobiliti",careers:"Pegawai pengangkutan, perancang operasi, penganalisis mobiliti"},
  {name:"Maritim & Pelabuhan",study:"Perkapalan, terminal, dokumentasi, operasi pelabuhan dan perdagangan",careers:"Eksekutif perkapalan, pegawai pelabuhan, pegawai operasi marin"},
  {name:"Perolehan",study:"Sumber pembekal, kontrak, kos, kualiti dan pengurusan vendor",careers:"Pegawai perolehan, eksekutif pembelian, penganalisis vendor"},
  {name:"Operasi & Kualiti",study:"Proses, produktiviti, kawalan kualiti, data dan penambahbaikan",careers:"Eksekutif operasi, pegawai kualiti, penganalisis proses"},
  {name:"Perdagangan Antarabangsa",study:"Import eksport, kastam, dokumentasi, pasaran dan pematuhan",careers:"Eksekutif eksport, pegawai perdagangan, pegawai dokumentasi"}
 ],
 sosial:[
  {name:"Geografi",study:"Geografi manusia, geografi fizikal, GIS, remote sensing, alam sekitar dan pembangunan",careers:"Pegawai GIS, perancang bandar, pegawai penyelidik, pegawai alam sekitar, pegawai meteorologi"},
  {name:"Sains Pembangunan",study:"Pembangunan bandar/luar bandar, dasar, ekonomi pembangunan, perancangan dan kelestarian",careers:"Pegawai pembangunan, pegawai perancang, pegawai kerajaan tempatan, penyelidik"},
  {name:"Antropologi & Sosiologi",study:"Budaya, masyarakat, perubahan sosial, komuniti dan penyelidikan sosial",careers:"Pegawai penyelidik, pegawai pembangunan komuniti, penganalisis sosial, pegawai NGO"},
  {name:"Sejarah",study:"Sejarah Malaysia, Asia Tenggara, Asia, dunia, historiografi dan penyelidikan",careers:"Pegawai arkib, penyelidik, kurator, pegawai muzium, penulis kandungan sejarah"},
  {name:"Sains Sosial",study:"Gabungan disiplin seperti politik, ekonomi, antropologi, pembangunan dan masyarakat",careers:"Pegawai pentadbiran, penyelidik, penganalisis dasar, pegawai pembangunan"}
 ],
 media:[
  {name:"Komunikasi Media",study:"Teori media, penulisan, komunikasi massa, etika, penyelidikan dan pengurusan media",careers:"Pegawai komunikasi, wartawan, penulis, pegawai perhubungan awam, penyelidik media"},
  {name:"Kewartawanan",study:"Pelaporan berita, penyuntingan, data storytelling, media digital dan etika kewartawanan",careers:"Wartawan, editor berita, wartawan penyiaran, penulis digital"},
  {name:"Perhubungan Awam & Komunikasi Korporat",study:"PR, media relations, komunikasi organisasi, krisis, reputasi dan CSR",careers:"Pegawai PR, pegawai komunikasi korporat, pegawai media, perunding komunikasi"},
  {name:"Penyiaran",study:"Produksi radio/TV, skrip, studio, penyuntingan, penerbitan dan kandungan digital",careers:"Penerbit, pengarah, penyampai, penulis skrip, pengurus produksi"},
  {name:"Komunikasi Digital & Media Baharu",study:"Media sosial, kandungan digital, platform baharu, data media dan reka bentuk komunikasi",careers:"Social media manager, digital content creator, digital strategist, content producer"},
  {name:"Komunikasi Strategik",study:"Jenama, kempen, komunikasi organisasi, reputasi, stakeholder dan strategi",careers:"Strategic communication executive, brand executive, PR consultant, corporate communicator"},
  {name:"Skrin Kreatif, Penerbitan & Pengiklanan",study:"Filem, screen studies, penerbitan, pengiklanan, penulisan kreatif dan produksi",careers:"Producer, screenwriter, publishing executive, advertising executive, creative producer"}
 ]
};
const comparisons:Record<CareerKey,Requirement[]>={
 peguam:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Undang-undang",pngk:3.30,spm:"Kepujian BM, lulus Sejarah; rujuk syarat Bahasa Inggeris",stpm:"Minimum B- dalam 2 subjek",muet:"Band 4.0",extra:"Temu duga",source:"https://study.um.edu.my/Bachelor-of-laws"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Undang-undang",pngk:3.33,spm:"Minimum B Bahasa Melayu dan Bahasa Inggeris",stpm:"Minimum B+ Pengajian Am serta syarat subjek program",muet:"Tiada makluman rasmi",extra:"Temu duga",source:"https://www.ukm.my/fuu/fuu-undergraduate-admission/"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Sarjana Muda Undang-undang",pngk:null,spm:"Kepujian Bahasa Inggeris dan Matematik/Matematik Tambahan",stpm:"3 prinsipal, sekurang-kurangnya Gred B",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://law.uitm.edu.my/index.php/home/undergraduate",spmRules:[{subject:"Bahasa Inggeris",minimum:"C"},{subject:"Matematik / Matematik Tambahan",minimum:"C"}]}
 ],
 doktor:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Doktor Perubatan",pngk:3.80,spm:"Minimum B: Biologi, Kimia, Fizik, Matematik/Matematik Tambahan dan 1 subjek lain",stpm:"Minimum B: Biologi, Kimia dan Fizik/Mathematics",muet:"Band 4.0",extra:"Temu duga",source:"https://www.ukm.my/sppfper/wp-content/uploads/2023/03/Medicine-2023-UPU_compressed.pdf"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Doktor Perubatan",pngk:3.80,spm:"Subjek Sains dan Matematik tertakluk syarat khas program",stpm:"Biologi, Kimia dan Fizik/Mathematics",muet:"Tiada makluman rasmi",extra:"Ujian/temu duga jika ditetapkan",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"},
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Perubatan dan Sarjana Muda Pembedahan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Biologi, Kimia dan Fizik/Mathematics",muet:"Tiada makluman rasmi",extra:"Ujian/temu duga mengikut ketetapan",source:"https://study.um.edu.my/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Doktor Perubatan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Pemilihan kompetitif",source:"https://pohon.usm.my/"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Sarjana Muda Perubatan dan Pembedahan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Islam Antarabangsa Malaysia (UIAM)",program:"Sarjana Muda Perubatan dan Pembedahan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Syarat tambahan universiti boleh terpakai",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Malaysia Sarawak (UNIMAS)",program:"Doktor Perubatan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Pemilihan kompetitif",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Malaysia Sabah (UMS)",program:"Doktor Perubatan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Pemilihan kompetitif",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Sultan Zainal Abidin (UniSZA)",program:"Sarjana Muda Perubatan dan Pembedahan",pngk:null,spm:"Syarat khusus Sains dan Matematik",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Pemilihan kompetitif",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Sarjana Muda Perubatan dan Pembedahan",pngk:null,spm:"Syarat khusus Sains dan Matematik serta syarat program",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Syarat tambahan universiti boleh terpakai",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 akauntan:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Perakaunan",pngk:3.30,spm:"Matematik/Matematik Tambahan dan subjek berkaitan tertakluk syarat program",stpm:"Sekurang-kurangnya gred yang ditetapkan dalam subjek diterima",muet:"Tiada makluman rasmi",extra:"Program kompetitif",source:"https://ebook.um.edu.my/MRC/Brochures/Buku_Syarat2023/files/basic-html/page200.html"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Perakaunan",pngk:3.30,spm:"Kepujian Matematik/Matematik Tambahan dan subjek Perakaunan/Ekonomi/Perniagaan",stpm:"Aliran Sains atau Sastera; semak subjek khusus",muet:"Band 3.0",extra:"Tiada maklumat temu duga pada rujukan",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-accounting-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"},{subject:"Perakaunan / Ekonomi / Perniagaan",minimum:"C"}]}
 ],
 jurutera:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Kejuruteraan Elektrik",pngk:3.00,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum Gred B dalam Mathematics (T) dan Physics",muet:"Band 3.0",extra:"Syarat khas rasmi dikemas kini Mei 2026",source:"https://study.um.edu.my/bachelor-of-electrical-engineering"},
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan (Elektrik)",pngk:2.80,spm:"Minimum Gred C dalam Matematik dan Fizik",stpm:"Minimum Gred B dalam dua subjek yang ditetapkan; rujuk kombinasi rasmi program",muet:"Band 1.0",extra:"Program TK23 · 8 semester",source:"https://fke.utm.my/undergraduate/apply-for-undergraduate-admission-local-student/admission-requirement-for-stpm-holders/",spmRules:[{subject:"Matematik",minimum:"C"},{subject:"Fizik",minimum:"C"}]},
 {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Kejuruteraan Elektrik dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah; syarat Fizik SPM terpakai bagi laluan STPM Biology",stpm:"Gred C dalam Pengajian Am dan dua subjek; syarat khas bidang: Mathematics serta Physics dan Chemistry, atau kombinasi yang dinyatakan",muet:"Band 2.0",extra:"Sumber rasmi sesi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html"}
 ,{uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Elektrik dengan Kepujian",pngk:null,spm:"Syarat Sains dan Matematik tertakluk syarat khusus program",stpm:"Kombinasi Mathematics dan subjek Sains mengikut syarat kemasukan program",muet:"Tiada makluman rasmi",extra:"Program prasiswazah diiktiraf EAC; angka minimum hanya dipaparkan apabila diterbitkan secara rasmi",source:"https://www.eng.usm.my/index.php/en/academic/school-of-electrical-electronic-engineering"}
 ,{uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Elektronik dengan Kepujian",pngk:null,spm:"Syarat Sains dan Matematik tertakluk syarat khusus program",stpm:"Kombinasi Mathematics dan subjek Sains mengikut syarat kemasukan program",muet:"Tiada makluman rasmi",extra:"Program prasiswazah diiktiraf EAC",source:"https://www.eng.usm.my/index.php/en/academic/school-of-electrical-electronic-engineering"}
 ,{uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Elektronik dengan Kepujian",pngk:null,spm:"Memenuhi syarat am dan syarat Matematik/Sains program",stpm:"Mathematics dan kombinasi subjek Sains yang ditetapkan",muet:"Tertakluk syarat rasmi kemasukan 2026/2027",extra:"Penawaran program disahkan dalam senarai rasmi program UTM",source:"https://admission.utm.my/offered-allcourses-malaysian/"}
 ],
 guru:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Pendidikan",pngk:null,spm:"Kepujian BM dan lulus Sejarah; syarat opsyen berbeza",stpm:"Minimum am C dalam PA dan 2 subjek, serta syarat khas opsyen",muet:"Minimum am Band 1.0",extra:"Ujian/temu duga untuk program bertanda #",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Sarjana Muda Pendidikan",pngk:null,spm:"Syarat bergantung pada opsyen pengajaran",stpm:"Subjek berkaitan opsyen mesti memenuhi gred khas",muet:"Berbeza mengikut program",extra:"MEdSI/temu duga bagi program yang menetapkannya",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 psikologi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Sains Sosial (Psikologi)",pngk:null,spm:"Syarat am SPM serta syarat khas program",stpm:"Minimum program dan subjek diterima perlu disemak",muet:"Tiada makluman rasmi",extra:"Program bertanda # memerlukan ujian/temu duga",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Program berkaitan Psikologi/Pembangunan Manusia",pngk:null,spm:"Bahasa, Matematik dan Sains bergantung pada program",stpm:"Syarat khas berbeza mengikut nama program",muet:"Tiada makluman rasmi",extra:"Pastikan program membawa kepada laluan kerjaya yang dikehendaki",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 farmasi:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Farmasi",pngk:3.80,spm:"Minimum B dalam Bahasa Inggeris, Biologi, Kimia, Fizik dan Matematik/Matematik Tambahan",stpm:"2A dan 1A- dalam Biologi, Kimia dan Fizik/Mathematics",muet:"Band 3.0",extra:"Ujian dan temu duga",source:"https://study.um.edu.my/bachelor-of-pharmacy-with-honours",spmRules:[{subject:"Bahasa Inggeris",minimum:"B"},{subject:"Biologi",minimum:"B"},{subject:"Kimia",minimum:"B"},{subject:"Fizik",minimum:"B"},{subject:"Matematik / Matematik Tambahan",minimum:"B"}]},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Farmasi",pngk:null,spm:"Syarat Sains khusus perlu dipenuhi",stpm:"Biologi, Kimia dan Fizik/Mathematics mengikut syarat khas",muet:"Tiada makluman rasmi",extra:"Ujian dan temu duga",source:"https://www.ukm.my/portal/undergraduate-programmes/"}
 ],
 teknologi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Sains Komputer",pngk:2.50,spm:"Matematik/Matematik Tambahan dan subjek Sains/ICT berkaitan",stpm:"Mathematics dan subjek Sains yang diterima",muet:"Tiada makluman rasmi",extra:"Ujian/temu duga bagi program bertanda #",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Sains Komputer",pngk:3.00,spm:"Minimum B dalam Matematik/Matematik Tambahan dan 1 subjek Sains/Komputer/ICT",stpm:"Minimum B- Mathematics dan B- dalam 1 subjek Sains diterima",muet:"Band 3.5",extra:"Aliran Sains",source:"https://study.um.edu.my/bachelor-of-computer-science-computer-system-and-network",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"B"},{subject:"Sains / Sains Komputer / ICT",minimum:"B"}]},
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Program Komputer, Data dan AI",pngk:null,spm:"Matematik/Matematik Tambahan serta subjek berkaitan",stpm:"Mathematics dan kombinasi subjek yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Pilih pengkhususan sebenar dalam e-Panduan",source:"https://upu.mohe.gov.my/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Program Sains Komputer",pngk:null,spm:"Syarat Matematik dan Sains mengikut program",stpm:"Kombinasi Sains/Mathematics ditetapkan",muet:"Tiada makluman rasmi",extra:"Rujuk buku syarat rasmi 2026",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Program Pengkomputeran",pngk:null,spm:"Matematik dan subjek berkaitan tertakluk program",stpm:"Syarat khas program perlu dipenuhi",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Sains Komputer (Kepintaran Buatan) dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah. Bagi laluan tanpa Mathematics STPM: kepujian Matematik Tambahan, atau Matematik bersama satu subjek Sains, Teknologi atau Kejuruteraan",stpm:"Minimum C dalam Mathematics (M/T) dan satu subjek Fizik, Kimia atau Biologi; atau minimum C dalam dua subjek Sains yang ditetapkan dengan syarat SPM tambahan",muet:"Band 2.0",extra:"Kod UC6481005 / BAXI · 7 semester · Fakulti Kecerdasan Buatan dan Keselamatan Siber",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]},
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Sains Komputer (Keselamatan Komputer) dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah. Bagi laluan tanpa Mathematics STPM: kepujian Matematik Tambahan, atau Matematik bersama satu subjek Sains, Teknologi atau Kejuruteraan",stpm:"Minimum C dalam Mathematics (M/T) dan satu subjek Fizik, Kimia atau Biologi; atau minimum C dalam dua subjek Sains yang ditetapkan dengan syarat SPM tambahan",muet:"Band 2.0",extra:"Kod UC6481006 / BAXZ · 7 semester · Fakulti Kecerdasan Buatan dan Keselamatan Siber",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]}
 ],
 sains:[
  {uni:"Universiti Malaya (UM)",program:"Program Sains",pngk:null,spm:"Matematik dan Sains mengikut pengkhususan",stpm:"Subjek Sains/Mathematics berkaitan",muet:"Tiada makluman rasmi",extra:"Pilih Fizik, Kimia, Biologi, Matematik atau cabang lain",source:"https://study.um.edu.my/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Program Sains dan Teknologi",pngk:null,spm:"Syarat Sains dan Matematik program",stpm:"Kombinasi subjek berkaitan",muet:"Tiada makluman rasmi",extra:"Nama program berbeza mengikut pusat pengajian",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Program Sains Tulen dan Gunaan",pngk:null,spm:"Syarat khas mengikut program",stpm:"Subjek Sains berkaitan",muet:"Tiada makluman rasmi",extra:"Semak saluran UPU/POHON",source:"https://pohon.usm.my/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Program Sains",pngk:null,spm:"Sains dan Matematik mengikut bidang",stpm:"Kombinasi subjek ditetapkan",muet:"Tiada makluman rasmi",extra:"Rujuk buku syarat 2026",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"}
 ],
 perniagaan:[
  {uni:"Universiti Malaya (UM)",program:"Ekonomi / Pentadbiran Perniagaan / Kewangan",pngk:null,spm:"Matematik dan syarat program berkaitan",stpm:"Subjek dan gred berbeza mengikut program",muet:"Tiada makluman rasmi",extra:"Bandingkan program sebenar, bukan nama fakulti",source:"https://study.um.edu.my/"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Ekonomi, Perniagaan, Kewangan dan Pengurusan",pngk:null,spm:"Matematik lazimnya diperiksa bagi program kuantitatif",stpm:"Syarat khas mengikut program",muet:"Tiada makluman rasmi",extra:"Pilihan pengkhususan yang luas",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Ekonomi dan Pengurusan",pngk:null,spm:"Syarat am dan khas program",stpm:"Ekonomi/Perniagaan/Mathematics mengikut program",muet:"Tiada makluman rasmi",extra:"Rujuk kod program dalam e-Panduan",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Ekonomi dan Pengurusan",pngk:null,spm:"Matematik dan syarat khusus program",stpm:"Kombinasi subjek diterima mengikut program",muet:"Tiada makluman rasmi",extra:"Rujuk buku syarat 2026",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Perniagaan, Kewangan dan Pengurusan",pngk:null,spm:"Syarat Matematik/Bahasa Inggeris mengikut program",stpm:"Syarat khas program perlu dipenuhi",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 kreatif:[
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Arts in Fine Arts with Honours",pngk:2.00,spm:"Kredit Bahasa Malaysia; syarat am universiti turut terpakai",stpm:"STPM minimum PNGK 2.00",muet:"Band 1.0",extra:"Temu duga & audition + portfolio seni/reka bentuk; program meliputi painting, sculpture, drawing, printmaking dan photography",source:"https://arts.usm.my/index.php/programmes/undergraduate/ba-hons-fine-arts"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Fine Arts in Communication Graphics with Honours",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Syarat khusus perlu disemak pada portal kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Program aktif dan disenaraikan secara rasmi oleh School of The Arts USM",source:"https://admission.usm.my/undergraduate/undergraduate-international"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Industrial Design with Honours",pngk:null,spm:"Memenuhi syarat am dan khas Fakulti Rekabentuk dan Senibina",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Program aktif di Faculty of Design and Architecture",source:"https://frsb.upm.edu.my/academic/undergraduate-674"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Graphic Design (Honours) — AD261",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat kemasukan rasmi program perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat program",extra:"Program aktif; disenaraikan dalam kemas kini rasmi UiTM 4 September 2026",source:"https://apply-iceps.uitm.edu.my/index.php/component/sppagebuilder/?id=40&view=page"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Creative Game Design (Honours) — AD233",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat rasmi perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat program",extra:"Program aktif; disenaraikan dalam kemas kini rasmi 4 September 2026",source:"https://apply-iceps.uitm.edu.my/index.php/component/sppagebuilder/?id=40&view=page"}
 ],
 kesihatanbersekutu:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Biomedical Science with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada paparan rasmi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · bidang kesihatan berasaskan sains makmal dan diagnostik",source:"https://www.ukm.my/studyukm/bachelor-of-biomedical-science-with-honours/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Dietetics with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; latar Biology/Chemistry/Mathematics/Physics diperlukan mengikut syarat fakulti",muet:"Mengikut syarat fakulti semasa",extra:"4 tahun / 8 semester · termasuk latihan pemakanan klinikal dan kaunseling pesakit",source:"https://www.ukm.my/studyukm/bachelor-of-dietetics-with-honours/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Physiotherapy with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · fokus assessment, treatment dan rehabilitation",source:"https://www.ukm.my/studyukm/bachelor-of-physiotherapy-with-honours/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Occupational Therapy with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · latihan untuk membantu klien mencapai fungsi harian optimum",source:"https://www.ukm.my/studyukm/bachelor-of-occupational-therapy-with-honours/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Diagnostic Imaging and Radiotherapy with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; latar Biology/Chemistry/Mathematics/Physics diperlukan mengikut syarat fakulti",muet:"Mengikut syarat fakulti",extra:"4 tahun · meliputi X-ray, CT, MRI, ultrasound, nuclear medicine dan radiotherapy",source:"https://www.ukm.my/studyukm/bachelor-of-diagnostic-imaging-and-radiotherapy-with-honours/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Audiology with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · program audiologi profesional berkaitan penilaian, diagnosis dan pengurusan masalah pendengaran/keseimbangan",source:"https://www.ukm.my/studyukm/bachelor-of-audiology-with-honours/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Biomedical Sciences with Honors",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi UPM",extra:"Program diakreditasi oleh Institute of Biomedical Science (UK); merangkumi anatomy, physiology, biotechnology, molecular biology, pharmacology, toxicology dan diagnostics",source:"https://medic.upm.edu.my/academic/undergraduate/bachelor_of_biomedical_sciences_with_honors-2485"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science Nutrition and Community Health with Honors",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"4 tahun / 142 kredit · termasuk industrial training di agensi kerajaan dan bukan kerajaan",source:"https://medic.upm.edu.my/akademik/pra_siswazah/bacelor_sains_pemakanan_dan_kesihatan_komuniti_dengan_kepujian-830?L=en"}
 ],
 alam:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Environmental Management with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas UPM",stpm:"Program aktif; syarat khusus STPM perlu disemak dalam dokumen kemasukan sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"8 semester / 4 tahun · menggabungkan sains biofizikal, ekonomi dan sosial dengan pengurusan pembangunan lestari",source:"https://env.upm.edu.my/akademik/undergraduate/bacelor_pengurusan_alam_sekitar-1099"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Environmental Science and Technology with Honours",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Program aktif; syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi UPM",extra:"Multidisiplin: sains asas, ekonomi, sains sosial, pengurusan, teknologi dan kejuruteraan; latihan profesional diwajibkan",source:"https://forenv.upm.edu.my/academic_and_student_affairs/undergraduate/programmes_courses-98"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Environmental Science)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Program aktif; syarat khusus Malaysia perlu disemak pada borang program semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"4 tahun · UKM Bangi · merangkumi biology, chemistry, earth science, pollution, GIS, remote sensing, toxicology dan EIA",source:"https://www.ukm.my/studyukm/environmental-science-bachelor-of-science-hons/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Occupational Safety and Health with Environmental Health with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat STPM Malaysia perlu disemak mengikut sesi",muet:"Mengikut syarat fakulti semasa",extra:"4 tahun · UKM Kuala Lumpur · fokus hubungan manusia-persekitaran, environmental health dan occupational safety & health",source:"https://www.ukm.my/studyukm/bachelor-of-occupational-safety-and-health-with-environmental-health-with-honours/"}
 ],
 pentadbiran:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Awam dengan Kepujian",pngk:2.75,spm:"Minimum lulus dalam Matematik/Matematik Tambahan/Prinsip Perakaunan/Perdagangan/Ekonomi/Perniagaan",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 3.0; atau Band 2.0 dengan kepujian Bahasa Inggeris SPM",extra:"UU6345002 · 7 semester · School of Government",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-public-management-with-honours"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Hal Ehwal Antarabangsa dengan Kepujian",pngk:3.00,spm:"Kepujian Matematik/Matematik Tambahan dan Bahasa Inggeris/Literature in English",stpm:"STPM Sastera atau Sains; minimum PNGK 3.00",muet:"Band 3.0",extra:"UU6345007 · 7 semester · School of International Studies",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-international-affairs-management-with-honours"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Political Science with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khusus STPM perlu disemak pada sesi kemasukan semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi",source:"https://www.ukm.my/studyukm/bachelor-of-social-sciences-with-honours-political-science/"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Arts International and Strategic Studies",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Program aktif; syarat kemasukan Malaysia perlu disemak pada pautan entry requirement rasmi",muet:"Semak syarat bahasa rasmi semasa",extra:"Fokus hubungan antarabangsa, dasar luar, keselamatan, pertahanan dan strategi",source:"https://fass.um.edu.my/bachelor-programme-of-arts-international-and-strategic-studies"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Sciences with Honours — Political Science",pngk:null,spm:"Kredit Bahasa Melayu/Bahasa Malaysia termasuk Kertas Julai dan lulus Sejarah",stpm:"Masuk melalui Bachelor of Social Sciences dan pilih major Political Science",muet:"Sekurang-kurangnya Band 2",extra:"4 tahun / 8 semester · salah satu major School of Social Sciences USM",source:"https://soc.usm.my/index.php/programmes/undergraduate/bachelor-of-social-sciences"}
 ],
 sukan:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Sports Science (Hons.) — SR243",pngk:null,spm:"Memenuhi syarat am dan syarat khas UiTM",stpm:"Syarat STPM rasmi perlu disemak melalui saluran kemasukan UiTM/UPU",muet:"Mengikut syarat rasmi program",extra:"Program aktif 2026; kursus termasuk physiology, biomechanics, sport psychology, nutrition, performance analysis dan rehabilitation",source:"https://sports.uitm.edu.my/index.php/component/content/article/195-sr-243-bachelor-of-sports-science-hons-2?Itemid=101&layout=edit"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Sports Management (Hons.) — SR241",pngk:null,spm:"Memenuhi syarat am dan khas UiTM",stpm:"Program aktif dan disenaraikan secara rasmi pada 2026",muet:"Mengikut syarat rasmi program",extra:"Program aktif di Faculty of Sports Science and Recreation",source:"https://sports.uitm.edu.my/index.php/programme"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Sports Management",pngk:null,spm:"Penglibatan aktif dalam sukan perlu dibuktikan; syarat akademik sesi semasa perlu disemak",stpm:"Program menerima aliran Sains/Sastera; syarat lama menunjukkan penglibatan aktif sukan sebagai syarat tambahan",muet:"Dokumen kemasukan terdahulu menetapkan Band 3.0; semak sesi semasa",extra:"Program aktif dalam brosur prasiswazah UM 2026; ujian bertulis/fizikal dan temu duga pernah dinyatakan dalam syarat kemasukan",source:"https://study.um.edu.my/doc/brochures/brochure-undergraduate-2026.pdf"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor in Health and Fitness (Honours) — SR245",pngk:null,spm:"Memenuhi syarat am dan khas UiTM",stpm:"Program aktif; syarat khusus perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat rasmi program",extra:"Program aktif dalam senarai rasmi Faculty of Sports Science and Recreation",source:"https://sports.uitm.edu.my/index.php/programme"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Exercise Science",pngk:null,spm:"Memenuhi syarat am dan khas UM",stpm:"Program aktif dalam brosur prasiswazah UM 2026",muet:"Semak syarat bahasa rasmi semasa",extra:"Laluan Exercise Science berbeza daripada Sports Management",source:"https://study.um.edu.my/doc/brochures/brochure-undergraduate-2026.pdf"},
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Sarjana Muda Pendidikan (Sains Sukan) dengan Kepujian",pngk:null,spm:"Minimum C Matematik dan minimum E satu subjek Sains/Sains Sukan/Fizik/Kimia/Biologi",stpm:"Memenuhi syarat am STPM universiti",muet:"Band 2.0",extra:"Sekurang-kurangnya mewakili daerah dalam sukan; MEdSI + temu duga + ujian khas; syarat kesihatan fizikal turut terpakai",source:"https://fssk.upsi.edu.my/?lang=ms&page_id=272"},
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Program Pendidikan Jasmani",pngk:null,spm:"Syarat khusus semasa perlu disemak melalui Fakulti Sains Sukan & Kejurulatihan",stpm:"Program berkaitan pendidikan sukan menerima calon tertakluk syarat universiti",muet:"Mengikut syarat program",extra:"Bidang melibatkan pedagogi, pergerakan, pendidikan kesihatan dan rekreasi",source:"https://fssk.upsi.edu.my/"},
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Program Sains Kejurulatihan",pngk:null,spm:"Syarat khusus sesi semasa perlu disemak",stpm:"Syarat kemasukan bergantung pada program yang dipilih",muet:"Mengikut syarat rasmi UPSI",extra:"Bidang kepakaran fakulti termasuk coaching science, performance analysis, motor learning dan conditioning",source:"https://fssk.upsi.edu.my/"}
 ],
 islam:[
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Bachelor of Law and Shariah with Honours",pngk:null,spm:"Bahasa Arab dan subjek Pengajian Islam berkaitan perlu memenuhi syarat khusus program",stpm:"Syarat STPM khusus perlu disemak pada portal kemasukan USIM semasa",muet:"Mengikut syarat rasmi program",extra:"Program dwi-major Undang-undang dan Syariah; diiktiraf LKPU pada Januari 2021",source:"https://fsu.usim.edu.my/undergraduate-programmes/program-sarjana-muda/"},
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Bachelor of Fiqh and Fatwa with Honours",pngk:null,spm:"Syarat Bahasa Arab dan Pengajian Islam perlu dipenuhi mengikut kategori kemasukan",stpm:"Syarat khusus program perlu disemak pada portal kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Kod UQ6221003 · 4 tahun / 8 semester · 143 kredit",source:"https://admission.usim.edu.my/program-details/?pid=20"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Usuluddin",pngk:null,spm:"Memenuhi syarat am dan khas Akademi Pengajian Islam UM",stpm:"Syarat program semasa perlu disemak melalui kemasukan UM",muet:"Mengikut syarat rasmi semasa",extra:"Dua trek: Islamic Thought & Spiritual Studies; Da'wah & Human Development",source:"https://apium.um.edu.my/department-of-usuluddin-and-da-wah"},
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Bachelor of Syariah (Halal Industry) with Honours",pngk:null,spm:"Syarat khusus merangkumi Bahasa Arab, Bahasa Inggeris dan subjek Sains/Pengajian Islam mengikut laluan",stpm:"Dokumen syarat menunjukkan bagi laluan STPM Sastera sekurang-kurangnya C+ dalam Bahasa Arab dan Syariah; semak syarat sesi semasa sebelum memohon",muet:"Dokumen syarat terdahulu menetapkan Band 3; semak semasa",extra:"4 tahun · mod 3u1i: 3 tahun universiti + 1 tahun industri · akreditasi penuh MQA",source:"https://fsu.usim.edu.my/undergraduate/bachelor-of-syariah-halal-industry-with-honours/"}
 ],
 bahasa:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Sarjana Muda Komunikasi dengan Kepujian",pngk:null,spm:"Bahasa Melayu, Bahasa Inggeris dan syarat khas program",stpm:"Syarat khas mengikut pengkhususan komunikasi",muet:"Tiada makluman rasmi",extra:"Pilih pengkhususan seperti perhubungan awam, penyiaran atau media baharu",source:"https://masscomm.uitm.edu.my/"},
  {uni:"Universiti Malaya (UM)",program:"Bahasa, Linguistik dan Komunikasi",pngk:null,spm:"Syarat bahasa mengikut program",stpm:"Kombinasi subjek diterima mengikut program",muet:"Tiada makluman rasmi",extra:"Semak nama dan pengkhususan program sebenar",source:"https://study.um.edu.my/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bahasa, Linguistik dan Media",pngk:null,spm:"Syarat am dan khas program",stpm:"Subjek dan gred mengikut program",muet:"Tiada makluman rasmi",extra:"Rujuk kod program dalam e-Panduan",source:"https://www.ukm.my/portal/undergraduate-programmes/"}
 ],
 bina:[
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Seni Bina / Ukur Bahan / Perancangan Bandar dan Wilayah / Seni Bina Landskap",pngk:null,spm:"Matematik serta syarat khas mengikut program",stpm:"Kombinasi subjek diterima mengikut program",muet:"Tiada makluman rasmi",extra:"Portfolio, ujian atau temu duga boleh dikenakan bagi program tertentu",source:"https://builtsurvey.utm.my/academic/undergraduate/quantity-surveying/"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Program Alam Bina, Ukur dan Hartanah",pngk:null,spm:"Syarat Matematik, Sains atau Seni mengikut program",stpm:"Syarat khas program perlu dipenuhi",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 matematik:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Sains dalam Matematik",pngk:3.00,spm:"Memenuhi syarat am SPM universiti; asas Matematik yang kukuh sangat penting",stpm:"Minimum B- dalam Mathematics/Matematik Tambahan dan minimum B- dalam satu daripada Biology, Physics atau Chemistry",muet:"Band 3.0",extra:"Halaman rasmi dikemas kini 16 Mei 2026",source:"https://study.um.edu.my/bachelor-of-science-of-mathematics"},
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Sains Aktuari",pngk:3.50,spm:"Memenuhi syarat am SPM universiti; asas Matematik yang kukuh sangat penting",stpm:"Minimum B- dalam Mathematics/Matematik Tambahan dan minimum B- dalam satu daripada Biology, Physics atau Chemistry",muet:"Band 3.0",extra:"Program 4 tahun; halaman rasmi dikemas kini 16 Mei 2026",source:"https://study.um.edu.my/bachelor-of-actuarial-science"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Sains dengan Kepujian (Matematik)",pngk:null,spm:"Kepujian Bahasa Melayu dan lulus Sejarah serta syarat khas program",stpm:"Memenuhi syarat khas program Matematik UKM",muet:"Sekurang-kurangnya Band 1.0 bagi syarat am UKM; semak syarat khas program",extra:"Program disenaraikan secara rasmi dalam kelompok Sains & Teknologi",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Sains dengan Kepujian (Statistik)",pngk:null,spm:"Kepujian Bahasa Melayu dan lulus Sejarah serta syarat khas program",stpm:"Memenuhi syarat khas program Statistik UKM",muet:"Sekurang-kurangnya Band 1.0 bagi syarat am UKM; semak syarat khas program",extra:"Program disenaraikan secara rasmi dalam kelompok Sains & Teknologi",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Sains dengan Kepujian (Sains Aktuari)",pngk:null,spm:"Kepujian Bahasa Melayu dan lulus Sejarah serta syarat khas program",stpm:"Memenuhi syarat khas program Sains Aktuari UKM",muet:"Sekurang-kurangnya Band 1.0 bagi syarat am UKM; semak syarat khas program",extra:"Program bertanda # dan boleh melibatkan ujian/temu duga",source:"https://www.ukm.my/portal/undergraduate-programmes/"}
 ],
 senibina:[
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Sains Senibina (Kod UT6581001)",pngk:3.00,spm:"Kepujian Matematik",stpm:"Minimum Gred B dalam mana-mana 2 subjek: Matematik M/T, Fizik, Kimia, Biologi, Geografi, Sejarah, Ekonomi, Seni Visual, Perakaunan, Pengajian Perniagaan, ICT atau Sains Sukan",muet:"Band 2.0",extra:"Ujian dan temu duga wajib; calon perlu bebas masalah penglihatan mengikut polisi Lembaga Arkitek Malaysia",source:"https://admission.utm.my/wp-content/uploads/sites/461/2026/02/SYARAT-KHAS-SARJANA-MUDA-UTM-SESI-20262027.pdf",spmRules:[{subject:"Matematik",minimum:"C"}]},
  {uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Sains Senibina",pngk:3.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah",stpm:"Minimum Gred B (NGMP 3.00) dalam mana-mana 2 subjek: Geografi, Sejarah, Ekonomi, Seni Visual, Pengajian Perniagaan, Perakaunan, Fizik, Kimia, Biologi atau Matematik M/T",muet:"Band 2.0",extra:"Ujian lukisan dan temu duga wajib",source:"https://admission.usm.my/index.php/undergraduate/undergraduate-malaysian?view=article&id=839&catid=63"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Seni Bina (Kod UP6581002)",pngk:2.00,spm:"Kepujian Bahasa Melayu dan Matematik/Matematik Tambahan",stpm:"Syarat khas subjek perlu disemak dalam buku syarat rasmi UPM",muet:"Band 2.0",extra:"Program bertanda #; wajib lulus ujian dan/atau temu duga yang ditetapkan",source:"https://akademik.upm.edu.my/upload/dokumen/menul320250227081643Syarat_Kemasukan_Program_Bacelor_UPM_2025-2026.pdf",spmRules:[{subject:"Bahasa Melayu",minimum:"C"},{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Seni Bina Landskap dengan Kepujian (Kod UP6581001)",pngk:2.00,spm:"Kepujian Bahasa Melayu dan Matematik/Matematik Tambahan",stpm:"Syarat khas subjek perlu disemak dalam buku syarat rasmi UPM",muet:"Band 2.0",extra:"Wajib lulus ujian dan/atau temu duga yang ditetapkan",source:"https://frsb.upm.edu.my/academic/undergraduate/bachelor_of_landscape_architecture_with_honours-77862?L=bm"}
 ],
 hospitaliti:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Pengurusan Hospitaliti / Pengurusan Pelancongan / Perkhidmatan Makanan",pngk:null,spm:"Syarat am dan khas mengikut program",stpm:"Syarat khas program perlu dipenuhi",muet:"Tiada makluman rasmi",extra:"Program mempunyai komponen praktikal dan latihan industri",source:"https://fhtm.uitm.edu.my/"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Program berkaitan Pelancongan, Hospitaliti dan Pengurusan Acara",pngk:null,spm:"Bahasa dan Matematik mengikut program",stpm:"Syarat khas program",muet:"Tiada makluman rasmi",extra:"Semak program sebenar dalam e-Panduan UPU",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local"}
 ],
 logistik:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Logistik, Pengangkutan dan Pengurusan Operasi",pngk:null,spm:"Matematik dan syarat am mengikut program",stpm:"Syarat khas program perlu dipenuhi",muet:"Tiada makluman rasmi",extra:"Bandingkan pengurusan logistik, operasi dan perniagaan antarabangsa",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Pengangkutan, Operasi dan Rantaian Bekalan",pngk:null,spm:"Matematik dan Bahasa Inggeris mengikut program",stpm:"Syarat khas program perlu dipenuhi",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Program berkaitan Maritim dan Operasi Pelabuhan",pngk:null,spm:"Syarat Matematik atau Sains mengikut program",stpm:"Kombinasi subjek mengikut program",muet:"Tiada makluman rasmi",extra:"Bezakan program pengurusan maritim daripada kejuruteraan marin",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 sosial:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Arts History",pngk:3.00,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum PNGK 3.00 dan minimum B- dalam dua subjek; aliran Sains atau Sastera",muet:"Semak syarat bahasa rasmi semasa",extra:"3.5 tahun / 7 semester · sejarah Malaysia, Asia Tenggara dan global",source:"https://study.um.edu.my/bachelor-of-arts-history"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Geography",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Program menerima aliran Sains dan Sastera; syarat khusus STPM dipaparkan pada halaman rasmi semasa",muet:"Semak syarat bahasa rasmi semasa",extra:"3.5 tahun / 7 semester · geografi manusia, fizikal dan aplikasi ruang",source:"https://study.um.edu.my/bachelor-of-geography"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Faculty of Social Sciences & Humanities undergraduate programmes",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Pilihan termasuk Geography, Development Science, Anthropology & Sociology, History dan lain-lain",muet:"Mengikut program",extra:"Gunakan program khusus apabila pelajar sudah mempunyai bidang sasaran",source:"https://www.ukm.my/studyukm/faculty-of-social-sciences-and-humanities/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Sciences with Honours",pngk:null,spm:"Kredit Bahasa Melayu/Bahasa Malaysia termasuk Kertas Julai dan lulus Sejarah",stpm:"Memenuhi syarat am dan khas Bachelor of Social Sciences USM",muet:"Sekurang-kurangnya Band 2",extra:"Empat major: Anthropology & Sociology, Development Studies, Economics dan Political Science",source:"https://admission.usm.my/index.php/course-ug/us6310001-sarjana-muda-sains-kemasyarakatan-kepujian-upu"}
 ],
 media:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Media Communication with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khas perlu disemak pada sesi kemasukan semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi · program ditanda # dalam senarai prasiswazah UKM, menandakan ujian/temu duga",source:"https://www.ukm.my/studyukm/media-communications-bachelor-of-social-sciences-hons/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Program komunikasi tiga tahun dengan empat pengkhususan",muet:"Semak syarat rasmi kemasukan semasa",extra:"Pengkhususan: Digital Communication, Strategic Communication, Creative Screen, Journalism",source:"https://communication.usm.my/index.php/academic/undergraduate-programme"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Mass Communication (Hons.) Journalism (MC241)",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat STPM program perlu disemak melalui saluran rasmi UiTM/UPU",muet:"Semak syarat semasa program",extra:"Antara beberapa ijazah khusus UiTM (PR, Broadcasting, Advertising, Publishing, New Media Communication turut ditawarkan)",source:"https://masscomm.uitm.edu.my/index.php/academic/programme/undergraduate"}
 ],
 pertanian:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Agricultural Science with Honours",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Program sepenuh masa aktif 2026/2027; syarat khusus STPM perlu disemak melalui dokumen kemasukan sesi semasa",muet:"Mengikut syarat kemasukan UPM",extra:"Program utama Fakulti Pertanian; UPM turut menawarkan Horticulture, Agribusiness, Aquaculture, Animal Science, Plantation Management dan Smart Agriculture",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Horticulture with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas UPM",stpm:"Program aktif 2026/2027; syarat khusus perlu disemak mengikut sesi",muet:"Mengikut syarat rasmi semasa",extra:"Disenaraikan di bawah Faculty of Agriculture dalam prospektus 2026/2027",source:"https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Agribusiness with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif 2026/2027; semak subjek STPM yang diterima pada sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Fokus ekonomi, pemasaran, pengurusan dan rantaian nilai agro",source:"https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Forestry Science with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas universiti",stpm:"Program aktif; syarat khas kemasukan perlu disemak mengikut sesi",muet:"Mengikut syarat rasmi semasa",extra:"UPM turut menawarkan Timber Industry, Parks & Recreation Science, Environmental Management dan Environmental Science & Technology",source:"https://forenv.upm.edu.my/academic_and_student_affairs/undergraduate/programmes_courses-98"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Aquaculture with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif di UPM; syarat STPM khusus mengikut sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Disenaraikan di Faculty of Agriculture UPM",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Food Science and Technology with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas Fakulti Sains dan Teknologi Makanan",stpm:"Syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Program masih dalam kitaran akreditasi penuh sehingga 2027/2028; semakan kurikulum bermula 2026/2027",source:"https://food.upm.edu.my/akademik/prasiswazah/takwim_semakan_kurikulum_program_pengajian_fakulti_sains_dan_teknologi_makanan-86298"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Plantation Management with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif 2026/2027; semak syarat sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Disenaraikan dalam prospektus Faculty of Agriculture 2026/2027",source:"https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Smart Agricultural Technology with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif 2026/2027; syarat subjek perlu disemak mengikut sesi",muet:"Mengikut syarat rasmi semasa",extra:"Laluan baharu yang menggabungkan pertanian dengan sensor, automasi, data dan teknologi digital",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"}
 ],
 veterinar:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Doktor Perubatan Veterinar",pngk:3.50,spm:"Kepujian Bahasa Melayu/Bahasa Malaysia dan lulus Sejarah; syarat am universiti turut terpakai",stpm:"PNGK minimum 3.50; minimum B+ Biology dan B Chemistry, atau B+ Chemistry dan B Biology",muet:"Band 3.0",extra:"Temu duga wajib · program profesional 5 tahun",source:"https://vet.upm.edu.my/academic_members/undergraduate/admission_requirement-391?L=bm"},
  {uni:"Universiti Malaysia Kelantan (UMK)",program:"Doktor Perubatan Veterinar",pngk:null,spm:"Program sesi 2026 mempunyai syarat khusus SPM mengikut kategori kemasukan",stpm:"Syarat STPM sesi 2026 perlu disemak pada paparan kategori STPM UMK",muet:"Mengikut kategori kemasukan; program memerlukan tahap MUET yang ditetapkan",extra:"Kod UPU UL6640001 · temu duga diperlukan · program aktif sesi 2026",source:"https://study.umk.edu.my/syarat_sistem/syarat_public.cfm?prog=12&tahun=2026"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Animal Science with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif; syarat khusus perlu disemak dalam dokumen kemasukan sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Program aktif di Department of Animal Science",source:"https://agri.upm.edu.my/prasiswazah/mengenai_kami/penyelaras_program_pengerusi_kurikulum-60798"},
  {uni:"Universiti Malaysia Kelantan (UMK)",program:"Ijazah Sarjana Muda Sains Gunaan (Teknologi Penternakan) dengan Kepujian",pngk:null,spm:"Syarat khusus sesi 2026 perlu disemak pada portal UMK",stpm:"Program aktif untuk sesi 2026; syarat STPM program tersedia melalui portal kemasukan UMK",muet:"Mengikut syarat rasmi program",extra:"Fakulti Industri Asas Tani · Kod UPU UL6620001",source:"https://study.umk.edu.my/syarat_sistem/program_public.cfm?carian=&fak=0&jenis=IJAZAH+SARJANA+MUDA&tahun=2026"}
 ],
 marin:[
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Bachelor in Science (Marine Science) with Honours",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"STPM Sains: minimum Gred C dalam SATU subjek daripada Biology / Physics / Chemistry / Mathematics T / Mathematics M",muet:"Band 2.0",extra:"7 semester / 3.5 tahun · merangkumi biological, physical, chemical dan geological oceanography, GIS, EIA dan marine policy",source:"https://www.umt.edu.my/sarjana-muda-sains-sains-marin-dengan-kepujian-fssm/?lang=ms"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Marine Sciences)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Program aktif; syarat Malaysia khusus perlu disemak mengikut sesi kemasukan",muet:"Mengikut syarat fakulti semasa",extra:"4 tahun · UKM Bangi · meliputi biologi marin, ekologi, kimia marin, geologi marin, remote sensing, GIS, oseanografi dan iklim",source:"https://www.ukm.my/studyukm/marine-sciences-bachelor-of-science-hons/"},
  {uni:"Universiti Malaysia Sabah (UMS)",program:"Bachelor of Science with Honours (Marine Science)",pngk:null,spm:"Memenuhi syarat am dan khas UMS",stpm:"Program aktif; syarat sesi semasa perlu disemak melalui kemasukan UMS",muet:"Mengikut syarat rasmi UMS",extra:"Kod UH6443003 · 4 tahun / 8 semester · program masih disenaraikan dalam prospektus terkini",source:"https://ums.edu.my/v5/en/out-campus-programme/94-admission"},
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Bachelor of Applied Science (Fisheries) with Honours",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"STPM Sains: minimum Gred C dalam satu subjek yang diterima mengikut syarat program",muet:"Semak syarat rasmi program semasa",extra:"6 semester / 3 tahun · kursus merangkumi fisheries science, fish population dynamics, aquatic ecology, fish health dan fishing gear technology",source:"https://www.umt.edu.my/sarjana-muda-sains-gunaan-perikanan-dengan-kepujian-fpsm/"}
 ],
 kerjasosial:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Social Work with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khusus STPM Malaysia perlu disemak pada sesi semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi · program ditanda # dalam senarai prasiswazah UKM, menunjukkan peperiksaan/temu duga",source:"https://www.ukm.my/studyukm/social-work-bachelor-of-social-sciences-hons/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Work",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Syarat kemasukan perlu disemak melalui portal rasmi Pohon USM",muet:"Mengikut syarat rasmi semasa",extra:"4 tahun · 122 unit · program profesional dengan beberapa praktikum · medium utama Bahasa Malaysia",source:"https://soc.usm.my/index.php/programmes/undergraduate/bachelor-of-social-work"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Pembangunan dengan Kepujian",pngk:2.75,spm:"Sekurang-kurangnya lulus satu daripada Mathematics / Additional Mathematics / Prinsip Perakaunan / Perdagangan / Ekonomi Asas / Lukisan Kejuruteraan / Ekonomi / Perniagaan",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 2.0; atau lulus Bahasa Inggeris SPM mengikut laluan yang dinyatakan program",extra:"UU6345008 · 7 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-development-management-with-honours"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Human Development Science with Honours",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Program aktif pada 2026; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Bidang meliputi perkembangan manusia, keluarga, demografi, psikologi sosial, perkhidmatan manusia dan komuniti",source:"https://www.upmet.upm.edu.my/program-bacelor-science-human-development"}
 ],
 maklumat:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Library Management — SI260",pngk:2.30,spm:"Memenuhi syarat am UiTM; semak syarat SPM khusus program semasa",stpm:"PNGK minimum 2.30 dengan Gred C (NGMP 2.00) dalam tiga subjek termasuk Pengajian Am",muet:"Mengikut syarat rasmi program",extra:"Lokasi termasuk Puncak Perdana, Sungai Petani dan Rembau",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si260"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Records Management — SI261",pngk:2.30,spm:"Kepujian Bahasa Melayu dan Bahasa Inggeris serta lulus Mathematics/Additional Mathematics",stpm:"PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am",muet:"Band 2.0",extra:"3 tahun · Puncak Perdana / Segamat · kursus termasuk Electronic Records Management, Digital Information Forensics dan Archival Preservation",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si-261"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Information Systems Management — SI262",pngk:2.30,spm:"Memenuhi syarat am UiTM dan syarat khas program",stpm:"PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am",muet:"Mengikut syarat rasmi program",extra:"3 tahun · Puncak Perdana",source:"https://fis.uitm.edu.my/component/sppagebuilder/page/232"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Information Content Management — SI263",pngk:2.30,spm:"Memenuhi syarat am UiTM dan syarat khas program",stpm:"PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am",muet:"Mengikut syarat rasmi program",extra:"3 tahun · Puncak Perdana",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si-263"}
 ]
};
type FinanceProgramKey="perakaunan"|"kewangan"|"ekonomi"|"islamik";
const financeProgramNames:Record<FinanceProgramKey,string>={
 perakaunan:"Perakaunan",kewangan:"Kewangan",ekonomi:"Ekonomi",islamik:"Perbankan & Kewangan Islam"
};
const financeComparisons:Record<FinanceProgramKey,Requirement[]>={
 perakaunan:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor in Accounting",pngk:3.30,spm:"Sekurang-kurangnya Gred B dalam Bahasa Inggeris dan Mathematics/Additional Mathematics",stpm:"Minimum Gred B- dalam dua subjek",muet:"Band 4.0",extra:"3.5 tahun · halaman rasmi dikemas kini 6 Mei 2026",source:"https://study.um.edu.my/bachelor-in-accounting",spmRules:[{subject:"Bahasa Inggeris",minimum:"B"},{subject:"Matematik / Matematik Tambahan",minimum:"B"}]},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Perakaunan dengan Kepujian",pngk:3.30,spm:"Kepujian Matematik/Matematik Tambahan dan subjek berkaitan jika laluan SPM digunakan",stpm:"Minimum C dalam Perakaunan/Ekonomi/Pengajian Perniagaan atau syarat SPM berkaitan",muet:"Band 3.0",extra:"UU6344001 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-accounting-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"},{subject:"Perakaunan / Ekonomi / Perniagaan",minimum:"C"}]},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Perakaunan (Sistem Maklumat) dengan Kepujian",pngk:3.30,spm:"Kepujian Matematik/Matematik Tambahan dan subjek Perakaunan/Ekonomi/Perniagaan/ICT jika laluan SPM digunakan",stpm:"Minimum C dalam Perakaunan/Ekonomi/Pengajian Perniagaan atau syarat SPM berkaitan",muet:"Band 3.0",extra:"UU6344002 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-accounting-information-system-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Sarjana Muda Perakaunan (Kepujian)",pngk:3.00,spm:"Empat kepujian termasuk Matematik/Matematik Tambahan/Matematik Kertas Julai",stpm:"Gred B dalam Perakaunan atau Ekonomi dan satu lagi subjek selain Pengajian Am",muet:"Band 3.0",extra:"Tertakluk kelayakan UiTM",source:"https://accountancy.uitm.edu.my/index.php/en/component/content/article/32-ac240-bachelor-in-accounting-honours?Itemid=101&catid=19",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Perakaunan (Kepujian)",pngk:null,spm:"Program disahkan masih ditawarkan; semak dokumen syarat sesi semasa",stpm:"Syarat khas program perlu disemak mengikut sesi kemasukan",muet:"Semak syarat rasmi sesi semasa",extra:"Tidak memaparkan angka 2026/2027 tanpa dokumen khusus sesi tersebut",source:"https://econ.upm.edu.my/students/prospective_students/undergraduate_prospective_students-64453"}
 ],
 kewangan:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Finance",pngk:3.00,spm:"Sekurang-kurangnya Gred B dalam Bahasa Inggeris dan Mathematics/Additional Mathematics",stpm:"Minimum Gred B- dalam dua subjek",muet:"Semak halaman rasmi semasa",extra:"Program semasa Fakulti Perniagaan dan Ekonomi UM",source:"https://study.um.edu.my/bachelor-of-finance",spmRules:[{subject:"Bahasa Inggeris",minimum:"B"},{subject:"Matematik / Matematik Tambahan",minimum:"B"}]},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Kewangan dengan Kepujian",pngk:2.50,spm:"Kepujian Matematik atau lulus Matematik Tambahan",stpm:"Minimum C+ dalam dua subjek termasuk Mathematics (M/T), Perakaunan, Ekonomi atau Pengajian Perniagaan",muet:"Band 3.0",extra:"UU6343001 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-finance-with-honours",spmRules:[{subject:"Matematik",minimum:"C"}]},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Kewangan Gunaan dengan Kepujian",pngk:null,spm:"Rujuk syarat rasmi UPM mengikut sesi",stpm:"Dokumen 2025/2026: minimum C+ dalam dua subjek daripada Mathematics M/T, Ekonomi, Geografi, Perakaunan atau Pengajian Perniagaan",muet:"Semak syarat sesi semasa",extra:"Syarat angka dilabel 2025/2026 dan tidak dianggap automatik untuk 2026/2027",source:"https://econ.upm.edu.my/students/prospective_students/undergraduate_prospective_students-64453"}
 ],
 ekonomi:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Economics",pngk:3.00,spm:"Memenuhi syarat am SPM dan syarat program semasa",stpm:"Minimum Gred B- dalam dua subjek",muet:"Semak halaman rasmi semasa",extra:"Program semasa Fakulti Perniagaan dan Ekonomi UM",source:"https://study.um.edu.my/bachelor-of-economics"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Sains Ekonomi dengan Kepujian",pngk:2.50,spm:"Kepujian Matematik atau lulus Matematik Tambahan",stpm:"Minimum C+ dalam dua subjek termasuk Mathematics (M/T) atau Ekonomi",muet:"Band 3.0; alternatif Band 2.0 dengan kepujian Bahasa Inggeris SPM",extra:"UU6314001 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-science-economics-with-honours",spmRules:[{subject:"Matematik",minimum:"C"}]},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Ekonomi dengan Kepujian",pngk:null,spm:"Dokumen 2025/2026 menetapkan sekurang-kurangnya C dalam subjek berkaitan",stpm:"Dokumen 2025/2026: minimum C+ dalam satu subjek berkaitan",muet:"Dokumen 2025/2026: Band 2.0",extra:"Dilabel 2025/2026; semak semula apabila syarat 2026/2027 diterbitkan",source:"https://econ.upm.edu.my/students/prospective_students/undergraduate_prospective_students-64453",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]}
 ],
 islamik:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Kewangan dan Perbankan Islam dengan Kepujian",pngk:null,spm:"Kepujian Matematik/Matematik Tambahan; atau lulus Matematik bersama kepujian subjek Perakaunan/Ekonomi/Perdagangan/Perniagaan",stpm:"Terbuka kepada STPM Sastera atau Sains; syarat am universiti turut terpakai",muet:"Band 2.0",extra:"UU6343002 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-islamic-finance-and-banking-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]}
 ]
};
type EducationProgramKey="biologi"|"fizik"|"kimia"|"matematik"|"sains"|"tesl"|"khas"|"kaunseling"|"sukan";
const educationProgramNames:Record<EducationProgramKey,string>={
 biologi:"Pendidikan Biologi",
 fizik:"Pendidikan Fizik",
 kimia:"Pendidikan Kimia",
 matematik:"Pendidikan Matematik",
 sains:"Pendidikan Sains",
 tesl:"TESL",
 khas:"Pendidikan Khas",
 kaunseling:"Bimbingan & Kaunseling",
 sukan:"Pendidikan Sains Sukan"
};
const educationComparisons:Record<EducationProgramKey,Requirement[]>={
 biologi:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Biologi) dengan Kepujian",pngk:2.75,spm:"Sekurang-kurangnya Gred C dalam Biologi",stpm:"Minimum B- dalam Biology dan satu daripada Physics/Chemistry/Mathematics (M)/(T)",muet:"Band 2.0",extra:"MEdSI + temu duga; 8 semester",source:"https://kemasukan.upsi.edu.my/wp-content/uploads/2025/01/buku_syarat_2025_compressed.pdf",spmRules:[{subject:"Biologi",minimum:"C"}]}
 ],
 fizik:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Fizik) dengan Kepujian",pngk:null,spm:"Syarat khusus SPM dan program perlu disemak dalam buku syarat UPSI",stpm:"Program memerlukan latar Fizik/STEM mengikut syarat khas semasa",muet:"Band 2.0",extra:"MEdSI + temu duga; program masih ditawarkan oleh FSM UPSI",source:"https://fsmt.upsi.edu.my/sarjana-muda-s/?lang=ms"}
 ],
 kimia:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Kimia) dengan Kepujian",pngk:null,spm:"Syarat khusus SPM dan program perlu disemak dalam buku syarat UPSI",stpm:"Program memerlukan latar Kimia/STEM mengikut syarat khas semasa",muet:"Band 2.0",extra:"MEdSI + temu duga; program masih ditawarkan oleh FSM UPSI",source:"https://fsmt.upsi.edu.my/sarjana-muda-s/?lang=ms"}
 ],
 matematik:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Sains (Matematik) dengan Pendidikan",pngk:2.75,spm:"Minimum B Matematik dan sekurang-kurangnya lulus Matematik Tambahan",stpm:"Minimum B- Mathematics (T) dan satu daripada Physics/Chemistry/Biology/ICT",muet:"Band 2.0",extra:"MEdSI + temu duga; 8 semester",source:"https://kemasukan.upsi.edu.my/wp-content/uploads/2024/02/FSM_A232.pdf",spmRules:[{subject:"Matematik",minimum:"B"},{subject:"Matematik Tambahan",minimum:"E"}]},
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Matematik) dengan Kepujian",pngk:null,spm:"Program masih ditawarkan; syarat khusus perlu disemak dalam buku syarat sesi semasa",stpm:"Latar Mathematics diperlukan mengikut syarat khas program",muet:"Band 2.0",extra:"MEdSI + temu duga",source:"https://fsmt.upsi.edu.my/sarjana-muda-s/?lang=ms"}
 ],
 sains:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Sains) dengan Kepujian",pngk:null,spm:"Syarat Sains dan Matematik mengikut program",stpm:"Kombinasi subjek Sains/STEM mengikut syarat khas program",muet:"Band 2.0",extra:"MEdSI + temu duga; program masih ditawarkan oleh FSM UPSI",source:"https://fsmt.upsi.edu.my/sarjana-muda-s/?lang=ms"}
 ],
 tesl:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Education Teaching of English as a Second Language (TESL)",pngk:3.00,spm:"Gred A Bahasa Inggeris dan minimum C Matematik",stpm:"Lulus STPM aliran Sains atau Sastera dengan PNGK minimum 3.00",muet:"Band 4.0",extra:"MEdSI + temu duga; syarat angka dirujuk daripada dokumen kemasukan UM yang diterbitkan",source:"https://study.um.edu.my/doc/brochures/SATU_Requirement_2023_final.pdf",spmRules:[{subject:"Bahasa Inggeris",minimum:"A"},{subject:"Matematik",minimum:"C"}]},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Education (Hons) TESL",pngk:null,spm:"Memenuhi syarat program dan Bahasa Inggeris yang ditetapkan fakulti",stpm:"Program menerima aliran Sastera/Sains tertakluk syarat khusus",muet:"Memenuhi tahap Bahasa Inggeris yang ditetapkan fakulti",extra:"Temu duga jika ditetapkan; program masih disenaraikan secara rasmi",source:"https://www.ukm.my/studyukm/teaching-of-english-as-a-second-language-tesl-bachelor-of-education-hons/"}
 ],
 khas:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Pendidikan Khas) dengan Kepujian",pngk:3.00,spm:"Minimum C Matematik/Matematik Tambahan dan subjek Sains berkaitan; Bahasa Inggeris mengikut syarat program",stpm:"Memenuhi syarat am STPM UPSI",muet:"Band 2.0",extra:"MEdSI + temu duga; 8 semester",source:"https://kemasukan.upsi.edu.my/wp-content/uploads/2025/01/buku_syarat_2025_compressed.pdf",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"},{subject:"Sains / Fizik / Kimia / Biologi",minimum:"C"}]}
 ],
 kaunseling:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Bimbingan dan Kaunseling) dengan Kepujian",pngk:3.00,spm:"Minimum C Matematik/Matematik Tambahan dan minimum C satu subjek Sains",stpm:"Memenuhi syarat am STPM UPSI",muet:"Band 2.0",extra:"MEdSI + temu duga + ujian khas; 8 semester",source:"https://kemasukan.upsi.edu.my/wp-content/uploads/2025/01/buku_syarat_2025_compressed.pdf",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"},{subject:"Sains / Fizik / Kimia / Biologi",minimum:"C"}]}
 ],
 sukan:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Sarjana Muda Pendidikan (Sains Sukan) dengan Kepujian",pngk:null,spm:"Minimum C Matematik dan minimum E satu subjek Sains/Sains Sukan/Fizik/Kimia/Biologi",stpm:"Memenuhi syarat am STPM universiti",muet:"Band 2.0",extra:"Sekurang-kurangnya mewakili daerah dalam sukan; MEdSI + temu duga + ujian khas; syarat kesihatan fizikal turut terpakai",source:"https://fssk.upsi.edu.my/?lang=ms&page_id=272",spmRules:[{subject:"Matematik",minimum:"C"},{subject:"Sains / Sains Sukan / Fizik / Kimia / Biologi",minimum:"E"}]}
 ]
};
type LawProgramKey="llb"|"syariah"|"korporat"|"jenayah"|"antarabangsa";
const lawProgramNames:Record<LawProgramKey,string>={
 llb:"LLB / Undang-undang Sivil",
 syariah:"Syariah & Undang-undang",
 korporat:"Undang-undang Korporat & Komersial",
 jenayah:"Undang-undang Jenayah & Litigasi",
 antarabangsa:"Undang-undang Antarabangsa & Hak Asasi"
};
const lawComparisons:Record<LawProgramKey,Requirement[]>={
 llb:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Laws (Honours)",pngk:3.30,spm:"Memenuhi syarat am SPM; Bahasa Inggeris sangat penting",stpm:"Minimum B- dalam dua subjek",muet:"Band 4.0",extra:"Temu duga wajib · program 4 tahun · halaman rasmi dikemas kini 16 Mei 2026",source:"https://study.um.edu.my/Bachelor-of-laws"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Undang-undang dengan Kepujian",pngk:3.33,spm:"Minimum B dalam Bahasa Melayu dan Bahasa Inggeris",stpm:"Minimum B+ dalam Pengajian Am",muet:"Band 4.0",extra:"Temu duga · syarat fakulti rasmi semasa",source:"https://www.ukm.my/fuu/fuu-undergraduate-admission/",spmRules:[{subject:"Bahasa Melayu",minimum:"B"},{subject:"Bahasa Inggeris",minimum:"B"}]},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Sarjana Muda Undang-undang",pngk:null,spm:"Kepujian Bahasa Inggeris dan Matematik/Matematik Tambahan",stpm:"Minimum tiga prinsipal dengan sekurang-kurangnya Gred B",muet:"Band 4.0",extra:"Temu duga · ditawarkan di kampus Shah Alam · tertakluk kelayakan UiTM",source:"https://law.uitm.edu.my/index.php/home/undergraduate",spmRules:[{subject:"Bahasa Inggeris",minimum:"C"},{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Islam Antarabangsa Malaysia (UIAM/IIUM)",program:"Bachelor of Laws (Honours)",pngk:null,spm:"Syarat khusus sesi semasa perlu disahkan melalui dokumen kemasukan UIAM",stpm:"Pemohon kelayakan Malaysia memohon melalui UPU; syarat khusus program perlu dipenuhi",muet:"Semak syarat bahasa sesi semasa",extra:"Program aktif dan diakreditasi; jangan gunakan syarat program lain sebagai pengganti syarat LLB",source:"https://www.iium.edu.my/admissions/"}
 ],
 syariah:[
  {uni:"Universiti Islam Antarabangsa Malaysia (UIAM/IIUM)",program:"Bachelor of Laws (Shari'ah) (Honours)",pngk:null,spm:"Syarat Bahasa Arab/Islamik dan syarat program perlu disahkan mengikut sesi",stpm:"Syarat khusus program Syariah & Undang-undang perlu dipenuhi",muet:"Semak syarat bahasa sesi semasa",extra:"Program aktif; MQA/SWA12227 · UIAM Gombak",source:"https://www.iium.edu.my/admissions/"},
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Syariah dan Undang-undang / program undang-undang Syariah berkaitan",pngk:null,spm:"Bahasa Arab dan subjek Pengajian Islam boleh menjadi syarat khas mengikut program",stpm:"Syarat khas Syariah/Undang-undang mengikut program",muet:"Semak syarat rasmi semasa",extra:"Pilih program sebenar dalam e-Panduan/portal USIM kerana Syariah, Fiqh & Fatwa dan Syariah & Undang-undang ialah laluan berbeza",source:"https://fsu.usim.edu.my/"}
 ],
 korporat:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Laws (Honours) — laluan subjek korporat/komersial",pngk:3.30,spm:"Memenuhi syarat am SPM",stpm:"Minimum B- dalam dua subjek",muet:"Band 4.0",extra:"Undang-undang korporat/komersial ialah pengkhususan/subjek dalam laluan LLB, bukan syarat kemasukan berasingan",source:"https://study.um.edu.my/Bachelor-of-laws"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Undang-undang — laluan korporat/komersial",pngk:3.33,spm:"Minimum B Bahasa Melayu dan Bahasa Inggeris",stpm:"Minimum B+ Pengajian Am",muet:"Band 4.0",extra:"Masuk melalui LLB; bidang korporat/komersial diterokai dalam kursus dan kerjaya selepas itu",source:"https://www.ukm.my/fuu/fuu-undergraduate-admission/",spmRules:[{subject:"Bahasa Melayu",minimum:"B"},{subject:"Bahasa Inggeris",minimum:"B"}]}
 ],
 jenayah:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Laws (Honours) — laluan jenayah/litigasi",pngk:3.30,spm:"Memenuhi syarat am SPM",stpm:"Minimum B- dalam dua subjek",muet:"Band 4.0",extra:"Masuk melalui LLB; litigasi dan jenayah ialah bidang amalan/pengkhususan selepas asas undang-undang",source:"https://study.um.edu.my/Bachelor-of-laws"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Undang-undang — laluan jenayah/litigasi",pngk:3.33,spm:"Minimum B Bahasa Melayu dan Bahasa Inggeris",stpm:"Minimum B+ Pengajian Am",muet:"Band 4.0",extra:"Temu duga; pengkhususan dibuat melalui kursus/latihan dan kerjaya",source:"https://www.ukm.my/fuu/fuu-undergraduate-admission/",spmRules:[{subject:"Bahasa Melayu",minimum:"B"},{subject:"Bahasa Inggeris",minimum:"B"}]}
 ],
 antarabangsa:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Laws (Honours) — laluan undang-undang antarabangsa",pngk:3.30,spm:"Memenuhi syarat am SPM",stpm:"Minimum B- dalam dua subjek",muet:"Band 4.0",extra:"Masuk melalui LLB; undang-undang antarabangsa/hak asasi dipelajari sebagai komponen dan pilihan kursus",source:"https://study.um.edu.my/Bachelor-of-laws"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sarjana Muda Undang-undang — laluan antarabangsa/hak asasi",pngk:3.33,spm:"Minimum B Bahasa Melayu dan Bahasa Inggeris",stpm:"Minimum B+ Pengajian Am",muet:"Band 4.0",extra:"Temu duga; bidang antarabangsa diterokai dalam program dan kerjaya selepas LLB",source:"https://www.ukm.my/fuu/fuu-undergraduate-admission/",spmRules:[{subject:"Bahasa Melayu",minimum:"B"},{subject:"Bahasa Inggeris",minimum:"B"}]}
 ]
};
type MathProgramKey="matematik"|"statistik"|"aktuari"|"industri"|"kuantitatif";
const mathProgramNames:Record<MathProgramKey,string>={
 matematik:"Matematik",statistik:"Statistik",aktuari:"Sains Aktuari",industri:"Matematik Industri & Penyelidikan Operasi",kuantitatif:"Analitik Kuantitatif & Matematik Kewangan"
};
const mathComparisons:Record<MathProgramKey,Requirement[]>={
 matematik:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Science in Mathematics",pngk:3.00,spm:"Memenuhi syarat am SPM universiti; asas Matematik yang kukuh sangat penting",stpm:"Minimum B- Mathematics dan minimum B- dalam satu daripada Biology, Physics atau Chemistry",muet:"Band 3.0",extra:"Halaman rasmi program semasa UM",source:"https://study.um.edu.my/bachelor-of-science-of-mathematics"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Mathematics)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Program Matematik aktif; syarat khas STPM perlu disemak pada program semasa",muet:"Semak syarat fakulti semasa",extra:"Kod UK6461001 · 4 tahun · UKM Bangi",source:"https://www.ukm.my/studyukm/mathematics-bachelor-of-science-hons/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Matematik dengan Kepujian",pngk:null,spm:"Program aktif pada senarai Fakulti Sains 2026",stpm:"Syarat khusus perlu disemak dalam dokumen kemasukan sesi semasa",muet:"Semak syarat sesi semasa",extra:"Kod UP6461001 · 8 semester · program aktif 2026",source:"https://science.upm.edu.my/akademik/prasiswazah/program_pengajian_dan_syarat_kemasukan-66?L=bm"}
 ],
 statistik:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science in Statistics with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Program Statistik aktif; syarat khusus STPM perlu disemak pada program semasa",muet:"Semak syarat fakulti semasa",extra:"Kod UK6462001 · 4 tahun · UKM Bangi",source:"https://www.ukm.my/studyukm/statistics-bachelor-of-science-hons/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Statistik dengan Kepujian",pngk:2.75,spm:"Memenuhi syarat am SPM universiti",stpm:"Sesi 2025/2026: minimum B- Mathematics T dan minimum C dalam dua daripada Physics, Biology atau Chemistry",muet:"Band 2.0 (dokumen sesi 2025/2026)",extra:"Syarat angka dilabel 2025/2026; program masih aktif pada 2026",source:"https://akademik.upm.edu.my/upload/dokumen/menul320250307120322menul320250227081643Syarat_Kemasukan_Program_Bacelor_UPM_2025-2026.pdf"}
 ],
 aktuari:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Actuarial Science",pngk:3.50,spm:"Memenuhi syarat am SPM universiti; Matematik sangat penting",stpm:"Minimum B- Mathematics dan minimum B- dalam satu daripada Biology, Physics atau Chemistry",muet:"Band 3.0",extra:"Program 4 tahun · aktuari, risiko, insurans dan kewangan kuantitatif",source:"https://study.um.edu.my/bachelor-of-actuarial-science"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Actuarial Science)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Program Sains Aktuari aktif; syarat khusus program perlu dipenuhi",muet:"Semak syarat fakulti semasa",extra:"Kod UK6462002 · 4 tahun · program aktif UKM",source:"https://www.ukm.my/studyukm/actuarial-science-bachelor-of-science-hons/"}
 ],
 industri:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Mathematics) — laluan pemodelan/operasi",pngk:null,spm:"Memenuhi syarat am dan khas program Matematik",stpm:"Latar Mathematics diperlukan",muet:"Semak syarat fakulti",extra:"Matematik industri dan penyelidikan operasi biasanya diteroka melalui kursus Matematik/Statistik, bukan semestinya ijazah berasingan",source:"https://www.ukm.my/studyukm/mathematics-bachelor-of-science-hons/"}
 ],
 kuantitatif:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Actuarial Science — laluan risiko & matematik kewangan",pngk:3.50,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum B- Mathematics dan satu subjek Sains minimum B-",muet:"Band 3.0",extra:"Sesuai untuk kerjaya aktuari, risiko dan analitik kewangan",source:"https://study.um.edu.my/bachelor-of-actuarial-science"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sains Aktuari / Statistik — laluan analitik kuantitatif",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"Syarat khusus mengikut program yang dipilih",muet:"Semak syarat fakulti",extra:"Program meliputi matematik, statistik, computing, insurance dan finance",source:"https://www.ukm.my/studyukm/actuarial-science-bachelor-of-science-hons/"}
 ]
};
type ScienceProgramKey="fizik"|"kimia"|"biologi"|"bahan"|"geosains"|"forensik"|"nuklear"|"mikrobiologi";
const scienceProgramNames:Record<ScienceProgramKey,string>={
 fizik:"Fizik",kimia:"Kimia",biologi:"Biologi",bahan:"Sains Bahan",geosains:"Geologi & Geosains",forensik:"Sains Forensik",nuklear:"Sains Nuklear",mikrobiologi:"Mikrobiologi & Bioteknologi"
};
const scienceComparisons:Record<ScienceProgramKey,Requirement[]>={
 fizik:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Fizik dengan Kepujian",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum C+ Physics, C Mathematics (T), dan C Biology/Chemistry",muet:"Band 2.0",extra:"4 tahun / 8 semester",source:"https://science.upm.edu.my/kandungan/bacelor_sains_fizik_dengan_kepujian-59620?L=bm"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Science in Physics",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Syarat STPM perlu disemak pada paparan rasmi semasa program",muet:"Semak syarat bahasa rasmi semasa",extra:"Program aktif UM; syarat laluan Matrikulasi/Asasi menunjukkan asas Physics dan Mathematics yang kuat",source:"https://study.um.edu.my/bachelor-of-science-in-physics"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science in Physics with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas Fakulti Sains & Teknologi",stpm:"Syarat khusus program perlu disemak pada sesi kemasukan semasa",muet:"Semak syarat fakulti semasa",extra:"Program aktif di Fakulti Sains & Teknologi UKM",source:"https://www.ukm.my/studyukm/find-your-programme/"}
 ],
 kimia:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Kimia dengan Kepujian",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Syarat Chemistry, Mathematics (T)/Further Mathematics dan Biology/Physics perlu dipenuhi mengikut paparan rasmi program",muet:"Semak syarat rasmi program semasa",extra:"Program aktif; UPM turut menawarkan Kimia Perindustrian dan Kimia Petroleum",source:"https://science.upm.edu.my/kandungan/bacelor_sains_kimia_dengan_kepujian-31282?L=bm"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Chemistry)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Program aktif; kombinasi subjek Sains perlu memenuhi syarat fakulti",muet:"Semak syarat fakulti semasa",extra:"Program aktif Fakulti Sains & Teknologi UKM",source:"https://www.ukm.my/studyukm/chemistry-bachelor-of-science-hons/"}
 ],
 biologi:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Biologi dengan Kepujian",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Kombinasi Biology/Chemistry dan subjek Sains berkaitan mengikut syarat rasmi program",muet:"Semak syarat rasmi semasa",extra:"Program disahkan aktif pada senarai Fakulti Sains UPM",source:"https://science.upm.edu.my/?L=bm"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Biology)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Program aktif; syarat khusus STPM perlu dipenuhi",muet:"Semak syarat fakulti semasa",extra:"Program aktif Fakulti Sains & Teknologi UKM",source:"https://www.ukm.my/studyukm/faculty-of-science-and-technology/"}
 ],
 bahan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Sains Fizik Bahan dengan Kepujian",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum C+ Physics, C Mathematics (T), dan C Biology/Chemistry",muet:"Band 2.0",extra:"Program memberi fokus kepada bahan baharu dan teknologi bahan",source:"https://science.upm.edu.my/kandungan/bacelor_sains_fizik_bahan_dengan_kepujian-59621?L=bm"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Materials Science)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Syarat khusus STPM perlu disemak pada sesi semasa",muet:"Semak syarat fakulti semasa",extra:"Program aktif dalam senarai prasiswazah UKM",source:"https://www.ukm.my/studyukm/faculty-of-science-and-technology/"}
 ],
 geosains:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science in Geology with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Latar Sains diperlukan; syarat khusus STPM perlu disemak pada sesi semasa",muet:"Semak syarat fakulti semasa",extra:"4 tahun · UKM Bangi · bidang meliputi geologi ekonomi, petroleum, kejuruteraan dan alam sekitar",source:"https://www.ukm.my/studyukm/geology-bachelor-of-science-hons/"}
 ],
 forensik:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Forensic Science with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Asas tiga subjek daripada Biology, Chemistry dan Mathematics/Physics diperlukan mengikut kategori kemasukan",muet:"Semak keperluan Bahasa Inggeris fakulti semasa",extra:"4 tahun · UKM Kuala Lumpur · program berasaskan sains kesihatan",source:"https://www.ukm.my/studyukm/bachelor-of-forensic-science-with-honours/"}
 ],
 nuklear:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor in Nuclear Science with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Latar Physics, Chemistry/Biology dan Mathematics yang sesuai diperlukan mengikut syarat program",muet:"Semak syarat fakulti semasa",extra:"4 tahun · UKM Bangi · merangkumi radiasi, keselamatan dan aplikasi nuklear",source:"https://www.ukm.my/studyukm/nuclear-science-bachelor-of-science-hons/"}
 ],
 mikrobiologi:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Science in Biotechnology",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"Syarat STPM perlu disemak pada paparan rasmi semasa program",muet:"Semak syarat bahasa rasmi semasa",extra:"Program aktif; laluan Matrikulasi/Asasi memerlukan B- Biology dan B- satu daripada Chemistry/Physics/Mathematics/Further Mathematics",source:"https://study.um.edu.my/bachelor-of-science-in-biotechnology"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Microbiology)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Program aktif; syarat khusus STPM perlu dipenuhi",muet:"Semak syarat fakulti semasa",extra:"UKM turut menawarkan Biochemistry, Genetics, Bioinformatics dan Plant Biotechnology",source:"https://www.ukm.my/studyukm/faculty-of-science-and-technology/"}
 ]
};
type BusinessProgramKey="pengurusan"|"pemasaran"|"sumber_manusia"|"keusahawanan"|"antarabangsa"|"analitik";
const businessProgramNames:Record<BusinessProgramKey,string>={
 pengurusan:"Pengurusan & Pentadbiran Perniagaan",pemasaran:"Pemasaran",sumber_manusia:"Pengurusan Sumber Manusia",keusahawanan:"Keusahawanan",antarabangsa:"Perniagaan Antarabangsa",analitik:"Analitik Perniagaan & Operasi"
};
const businessComparisons:Record<BusinessProgramKey,Requirement[]>={
 pengurusan:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Business Administration",pngk:3.30,spm:"Sekurang-kurangnya Gred B dalam dua subjek daripada Bahasa Inggeris dan Mathematics/Additional Mathematics",stpm:"Minimum PNGK 3.30 dan minimum Gred B- dalam dua subjek",muet:"Band 4.0",extra:"Program semasa UM; syarat STPM dipaparkan pada halaman kemasukan program",source:"https://study.um.edu.my/bachelor-of-business-administration",spmRules:[{subject:"Bahasa Inggeris",minimum:"B"},{subject:"Matematik / Matematik Tambahan",minimum:"B"}]},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Business Administration with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas Fakulti Ekonomi & Pengurusan",stpm:"Program aktif; syarat khusus perlu disemak mengikut sesi kemasukan",muet:"Memenuhi minimum English requirement fakulti",extra:"3 tahun · UKM Bangi · program meliputi management, marketing, finance dan international business",source:"https://www.ukm.my/studyukm/business-administration-bachelor-hons/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Business Administration with Honours",pngk:null,spm:"Program aktif 2026; syarat khas sesi semasa perlu disemak pada portal kemasukan",stpm:"Syarat khusus STPM mengikut dokumen kemasukan sesi semasa",muet:"Semak syarat rasmi sesi semasa",extra:"123 kredit; teras disiplin merangkumi HR, Marketing, Finance, International Business dan Entrepreneurship",source:"https://econ.upm.edu.my/program/prasiswazah/bacelor_pentadbiran_perniagaan_dengan_kepujian-64273"}
 ],
 pemasaran:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pemasaran dengan Kepujian",pngk:2.75,spm:"Kepujian Matematik/Matematik Tambahan; atau lulus Matematik bersama kepujian satu subjek Perniagaan/Ekonomi/Perakaunan/Sains yang diterima",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 3.0; atau Band 2.0 bersama kepujian Bahasa Inggeris SPM",extra:"UU6342001 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-marketing-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Business in Marketing (Honours)",pngk:null,spm:"Syarat khusus kemasukan UiTM perlu dipenuhi",stpm:"Syarat khusus STPM program perlu disemak melalui saluran rasmi UiTM/UPU",muet:"Semak syarat semasa program",extra:"Program semasa Fakulti Pengurusan dan Perniagaan UiTM",source:"https://fbm.uitm.edu.my/index.php/ba240-marketing"}
 ],
 sumber_manusia:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Sumber Manusia dengan Kepujian",pngk:2.75,spm:"Kepujian Matematik/Matematik Tambahan; atau lulus Matematik bersama kepujian subjek berkaitan",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 3.0; atau Band 2.0 dengan kepujian Bahasa Inggeris SPM",extra:"UU6345005 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-human-resource-management-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Business Administration with Honours — Human Resource Management",pngk:null,spm:"Syarat program BBA mengikut sesi semasa",stpm:"Masuk melalui BBA UPM; HR ialah salah satu teras disiplin program",muet:"Semak syarat rasmi sesi semasa",extra:"UPM mengesahkan HR Management sebagai salah satu core discipline dalam BBA",source:"https://econ.upm.edu.my/program/prasiswazah/bacelor_pentadbiran_perniagaan_dengan_kepujian-64273"}
 ],
 keusahawanan:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Keusahawanan dengan Kepujian",pngk:2.75,spm:"Kepujian Matematik/Matematik Tambahan; atau lulus Matematik bersama kepujian subjek berkaitan seperti Ekonomi/Perniagaan/Perakaunan/Sains",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 2.0",extra:"UU6345011 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-entrepreneurship-with-honours",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"}]},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Business Administration with Honours — Entrepreneurship",pngk:null,spm:"Syarat program BBA mengikut sesi semasa",stpm:"Masuk melalui BBA UPM; Entrepreneurship ialah salah satu core discipline",muet:"Semak syarat rasmi sesi semasa",extra:"UPM mengesahkan Entrepreneurship sebagai salah satu teras disiplin BBA",source:"https://econ.upm.edu.my/program/prasiswazah/bacelor_pentadbiran_perniagaan_dengan_kepujian-64273"}
 ],
 antarabangsa:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Perniagaan Antarabangsa dengan Kepujian",pngk:3.00,spm:"Kepujian Matematik dan Bahasa Inggeris",stpm:"STPM Sastera atau Sains; minimum PNGK 3.00",muet:"Band 3.0",extra:"UU6345006 · 8 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-international-business-management-with-honours",spmRules:[{subject:"Matematik",minimum:"C"},{subject:"Bahasa Inggeris",minimum:"C"}]},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Business Administration with Honours — International Business",pngk:null,spm:"Memenuhi syarat am dan khas BBA",stpm:"Masuk melalui BBA UKM; International Business ialah sebahagian daripada struktur program",muet:"Memenuhi syarat English fakulti",extra:"International Business disenaraikan dalam struktur program BBA UKM",source:"https://www.ukm.my/studyukm/business-administration-bachelor-hons/"}
 ],
 analitik:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Business Administration — laluan kuantitatif/analitik perniagaan",pngk:3.30,spm:"Sekurang-kurangnya Gred B dalam dua subjek termasuk Bahasa Inggeris dan Mathematics/Additional Mathematics",stpm:"Minimum B- dalam dua subjek",muet:"Semak syarat bahasa semasa",extra:"Laluan analitik biasanya datang melalui kursus kuantitatif, statistik, operasi dan sistem maklumat dalam BBA",source:"https://study.um.edu.my/bachelor-of-business-administration"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Business Administration with Honours — operasi & keputusan perniagaan",pngk:null,spm:"Syarat BBA mengikut sesi kemasukan semasa",stpm:"Masuk melalui BBA UPM",muet:"Semak syarat rasmi semasa",extra:"Program menggabungkan pengurusan, kewangan, pemasaran, HR, antarabangsa dan keusahawanan; kemahiran analitik dibangunkan melalui kursus kuantitatif dan keputusan perniagaan",source:"https://econ.upm.edu.my/program/prasiswazah/bacelor_pentadbiran_perniagaan_dengan_kepujian-64273"}
 ]
};
type HumanProgramKey="psikologi"|"kaunseling"|"pembangunan"|"pembangunan_pengurusan"|"pembangunan_it";
const humanProgramNames:Record<HumanProgramKey,string>={
 psikologi:"Psikologi",kaunseling:"Bimbingan & Kaunseling",pembangunan:"Sains Pembangunan Manusia",pembangunan_pengurusan:"Pembangunan Manusia dengan Pengurusan",pembangunan_it:"Pembangunan Manusia dengan Teknologi Maklumat"
};
const humanComparisons:Record<HumanProgramKey,Requirement[]>={
 psikologi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Psychology with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khas STPM perlu disemak pada borang program semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi · intake September",source:"https://www.ukm.my/studyukm/psychology-bachelor-of-social-sciences-hons/"}
 ],
 kaunseling:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Ijazah Sarjana Muda Pendidikan (Bimbingan dan Kaunseling) dengan Kepujian",pngk:3.00,spm:"Minimum C Matematik/Matematik Tambahan dan minimum C satu subjek Sains",stpm:"Memenuhi syarat am STPM UPSI",muet:"Band 2.0",extra:"MEdSI + temu duga + ujian khas; 8 semester",source:"https://kemasukan.upsi.edu.my/wp-content/uploads/2025/01/buku_syarat_2025_compressed.pdf",spmRules:[{subject:"Matematik / Matematik Tambahan",minimum:"C"},{subject:"Sains / Fizik / Kimia / Biologi",minimum:"C"}]}
 ],
 pembangunan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Human Development Science with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program mengikut sesi semasa",stpm:"Syarat khusus perlu disemak melalui kemasukan UPM/UPU",muet:"Semak syarat sesi semasa",extra:"4 tahun · Fakulti Ekologi Manusia · program aktif pada 2026",source:"https://eco1.upm.edu.my/faq"}
 ],
 pembangunan_pengurusan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Human Development Science with Management (Honours)",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Syarat khusus STPM mengikut sesi semasa",muet:"Semak syarat rasmi sesi semasa",extra:"4 tahun · kerjasama Fakulti Ekologi Manusia dan School of Business and Economics",source:"https://spel.upm.edu.my/kemasukan/program/prasiswazah-75800"},
  {uni:"Universiti Putra Malaysia Sarawak",program:"Bachelor of Human Development Science with Management Honours",pngk:null,spm:"Syarat khusus kemasukan 2026 perlu disemak melalui portal UPM Sarawak",stpm:"Program ditawarkan untuk kemasukan 2026",muet:"Semak syarat rasmi program",extra:"Disenaraikan secara rasmi dalam 2026 Admission Intakes",source:"https://sarawak.upm.edu.my/2026_admission_intakes/programme_offer_information/programme_offered-61898"}
 ],
 pembangunan_it:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Human Development Science with Information Technology (Honours)",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Syarat khusus STPM mengikut sesi semasa",muet:"Semak syarat rasmi sesi semasa",extra:"4 tahun / 8 semester · gabungan pembangunan manusia dan teknologi maklumat",source:"https://eco1.upm.edu.my/faq"}
 ]
};
type SocialHumanitiesProgramKey="geografi"|"pembangunan"|"antropologi"|"sejarah"|"sosial_am";
const socialHumanitiesProgramNames:Record<SocialHumanitiesProgramKey,string>={geografi:"Geografi",pembangunan:"Sains Pembangunan / Perancangan Pembangunan",antropologi:"Antropologi & Sosiologi",sejarah:"Sejarah",sosial_am:"Sains Sosial (pelbagai major)"};
const socialHumanitiesComparisons:Record<SocialHumanitiesProgramKey,Requirement[]>={
 geografi:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Geography",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Program menerima aliran Sains dan Sastera; syarat khusus STPM dipaparkan pada halaman rasmi semasa",muet:"Semak syarat bahasa rasmi semasa",extra:"3.5 tahun / 7 semester · geografi manusia, fizikal dan aplikasi ruang",source:"https://study.um.edu.my/bachelor-of-geography"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Geography with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat program khusus perlu disemak pada sesi semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi · merangkumi GIS dan remote sensing",source:"https://www.ukm.my/studyukm/geography-bachelor-of-social-sciences-hons/"}
 ],
 pembangunan:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Development Science with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khusus perlu disemak mengikut mod kemasukan",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · pembangunan bandar/luar bandar, dasar dan sumber",source:"https://www.ukm.my/studyukm/developmental-science-bachelor-of-social-sciences-hons/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Sciences with Honours — Development Studies / Development Planning and Management",pngk:null,spm:"Kredit Bahasa Melayu/Bahasa Malaysia termasuk Kertas Julai dan lulus Sejarah",stpm:"Memenuhi syarat am dan khas program Bachelor of Social Sciences USM",muet:"Sekurang-kurangnya Band 2",extra:"4 tahun / 8 semester · major pembangunan dalam Bachelor of Social Sciences",source:"https://soc.usm.my/index.php/programmes/undergraduate/bachelor-of-social-sciences"}
 ],
 antropologi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Anthropology and Sociology with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas fakulti",stpm:"Program aktif; syarat khusus perlu disemak pada sesi semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi",source:"https://www.ukm.my/studyukm/bachelor-of-social-sciences-with-honours-antropology-sociology/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Sciences with Honours — Anthropology and Sociology",pngk:null,spm:"Kredit Bahasa Melayu/Bahasa Malaysia termasuk Kertas Julai dan lulus Sejarah",stpm:"Memenuhi syarat am dan khas program Bachelor of Social Sciences USM",muet:"Sekurang-kurangnya Band 2",extra:"4 tahun / 8 semester · salah satu empat major utama School of Social Sciences USM",source:"https://soc.usm.my/index.php/programmes/undergraduate/bachelor-of-social-sciences"}
 ],
 sejarah:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Arts History",pngk:3.00,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum PNGK 3.00 dan minimum B- dalam dua subjek; aliran Sains atau Sastera",muet:"Semak syarat bahasa rasmi semasa",extra:"3.5 tahun / 7 semester · sejarah Malaysia, Asia Tenggara dan global",source:"https://study.um.edu.my/bachelor-of-arts-history"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Arts in History with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas FSSK",stpm:"Program aktif; syarat khusus perlu disemak pada sesi semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi",source:"https://www.ukm.my/studyukm/bachelor-of-arts-with-honours-history/"}
 ],
 sosial_am:[
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Sciences with Honours",pngk:null,spm:"Kredit Bahasa Melayu/Bahasa Malaysia termasuk Kertas Julai dan lulus Sejarah",stpm:"Memenuhi syarat am dan khas Bachelor of Social Sciences USM",muet:"Sekurang-kurangnya Band 2",extra:"Empat major: Anthropology & Sociology, Development Studies, Economics dan Political Science",source:"https://admission.usm.my/index.php/course-ug/us6310001-sarjana-muda-sains-kemasyarakatan-kepujian-upu"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Faculty of Social Sciences & Humanities undergraduate programmes",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas program",stpm:"Pilihan termasuk Geography, Development Science, Political Science, Psychology, Social Work dan lain-lain",muet:"Mengikut program",extra:"Gunakan program khusus apabila pelajar sudah mempunyai bidang sasaran",source:"https://www.ukm.my/studyukm/faculty-of-social-sciences-and-humanities/"}
 ]
};
type MediaProgramKey="media"|"journalism"|"pr"|"broadcast"|"digital"|"strategic"|"creative";
const mediaProgramNames:Record<MediaProgramKey,string>={media:"Komunikasi Media",journalism:"Kewartawanan",pr:"Perhubungan Awam & Komunikasi Korporat",broadcast:"Penyiaran",digital:"Komunikasi Digital & Media Baharu",strategic:"Komunikasi Strategik",creative:"Skrin Kreatif, Penerbitan & Pengiklanan"};
const mediaComparisons:Record<MediaProgramKey,Requirement[]>={
 media:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Media Communication with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khas perlu disemak pada sesi kemasukan semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi · program ditanda # dalam senarai prasiswazah UKM, menandakan ujian/temu duga",source:"https://www.ukm.my/studyukm/media-communications-bachelor-of-social-sciences-hons/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Program komunikasi tiga tahun dengan empat pengkhususan",muet:"Semak syarat rasmi kemasukan semasa",extra:"Pengkhususan: Digital Communication, Strategic Communication, Creative Screen, Journalism",source:"https://communication.usm.my/index.php/academic/undergraduate-programme"}
 ],
 journalism:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Mass Communication (Hons.) Journalism (MC241)",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat STPM program perlu disemak melalui saluran rasmi UiTM/UPU",muet:"Semak syarat semasa program",extra:"Program khusus Journalism masih disenaraikan secara rasmi pada 2026",source:"https://masscomm.uitm.edu.my/index.php/academic/programme/undergraduate"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours — Journalism",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Masuk melalui Bachelor of Communication dan pilih pengkhususan Journalism",muet:"Semak syarat rasmi semasa",extra:"Kursus termasuk Knowledge-Based Journalism, News Production for Multiple Platforms dan Data Storytelling",source:"https://admission.usm.my/index.php/undergraduate/undergraduate-malaysian?catid=73&id=692&view=article"}
 ],
 pr:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Mass Communication (Hons) Public Relations (MC242)",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat khusus program perlu disemak melalui UiTM/UPU",muet:"Semak syarat semasa program",extra:"Program khusus Public Relations masih disenaraikan secara rasmi",source:"https://masscomm.uitm.edu.my/index.php/academic/programme/undergraduate"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours — Strategic Communication",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Masuk melalui Bachelor of Communication",muet:"Semak syarat rasmi semasa",extra:"Prospek termasuk Public Relations Officer dan Corporate Communications Officer",source:"https://admission.usm.my/index.php/undergraduate/undergraduate-malaysian?catid=73&id=692&view=article"}
 ],
 broadcast:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Mass Communication (Hons.) Broadcasting (MC243)",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat STPM program perlu disemak melalui UiTM/UPU",muet:"Semak syarat semasa program",extra:"Program tiga tahun dengan latihan produksi dan kandungan digital",source:"https://masscomm.uitm.edu.my/index.php/degree/mc243"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours — Creative Screen",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Masuk melalui Bachelor of Communication",muet:"Semak syarat rasmi semasa",extra:"Bidang Creative Screen meliputi produksi skrin dan media kreatif",source:"https://communication.usm.my/index.php/academic/undergraduate-programme"}
 ],
 digital:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of New Media Communication (Hons.) (MC249)",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat STPM program perlu disemak melalui UiTM/UPU",muet:"Semak syarat semasa program",extra:"Program khusus New Media Communication disenaraikan secara rasmi",source:"https://masscomm.uitm.edu.my/index.php/academic/programme/undergraduate"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours — Digital Communication",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Masuk melalui Bachelor of Communication",muet:"Semak syarat rasmi semasa",extra:"Kursus termasuk Social Media Management, Global Media and Digital Culture dan Data Storytelling",source:"https://communication.usm.my/index.php/academic/undergraduate-programme"}
 ],
 strategic:[
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours — Strategic Communication",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Masuk melalui Bachelor of Communication",muet:"Semak syarat rasmi semasa",extra:"Kursus merangkumi Brand Communication, CSR dan media strategy",source:"https://admission.usm.my/index.php/undergraduate/undergraduate-malaysian?catid=73&id=692&view=article"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Communication (Hons) Communication Management & Policy (MC248)",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat program perlu disemak melalui UiTM/UPU",muet:"Semak syarat semasa program",extra:"Program khusus Communication Management & Policy",source:"https://masscomm.uitm.edu.my/index.php/academic/programme/undergraduate"}
 ],
 creative:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Advertising / Publishing / Broadcasting",pngk:null,spm:"Syarat khusus UiTM mengikut program",stpm:"Pilih MC244 Advertising, MC245 Publishing atau MC243 Broadcasting mengikut minat",muet:"Semak syarat rasmi semasa",extra:"UiTM menawarkan ijazah khusus bagi ketiga-tiga laluan",source:"https://masscomm.uitm.edu.my/index.php/academic/programme/undergraduate"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Communication with Honours — Creative Screen",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Masuk melalui Bachelor of Communication",muet:"Semak syarat rasmi semasa",extra:"Prospek termasuk film producer, production manager dan script writer",source:"https://admission.usm.my/index.php/undergraduate/undergraduate-malaysian?catid=73&id=692&view=article"}
 ]
};
type PublicAffairsProgramKey="politik"|"pentadbiran_awam"|"antarabangsa"|"dasar"|"diplomasi";
const publicAffairsProgramNames:Record<PublicAffairsProgramKey,string>={politik:"Sains Politik",pentadbiran_awam:"Pentadbiran & Pengurusan Awam",antarabangsa:"Hubungan Antarabangsa",dasar:"Dasar Awam & Tadbir Urus",diplomasi:"Diplomasi, Strategik & Keselamatan Antarabangsa"};
const publicAffairsComparisons:Record<PublicAffairsProgramKey,Requirement[]>={
 politik:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Political Science with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khusus STPM perlu disemak pada sesi kemasukan semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi",source:"https://www.ukm.my/studyukm/bachelor-of-social-sciences-with-honours-political-science/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Sciences with Honours — Political Science",pngk:null,spm:"Kredit Bahasa Melayu/Bahasa Malaysia termasuk Kertas Julai dan lulus Sejarah",stpm:"Masuk melalui Bachelor of Social Sciences dan pilih major Political Science",muet:"Sekurang-kurangnya Band 2",extra:"4 tahun / 8 semester · salah satu major School of Social Sciences USM",source:"https://soc.usm.my/index.php/programmes/undergraduate/bachelor-of-social-sciences"}
 ],
 pentadbiran_awam:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Awam dengan Kepujian",pngk:2.75,spm:"Minimum lulus dalam Matematik/Matematik Tambahan/Prinsip Perakaunan/Perdagangan/Ekonomi/Perniagaan",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 3.0; atau Band 2.0 dengan kepujian Bahasa Inggeris SPM",extra:"UU6345002 · 7 semester · School of Government",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-public-management-with-honours"}
 ],
 antarabangsa:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Hal Ehwal Antarabangsa dengan Kepujian",pngk:3.00,spm:"Kepujian Matematik/Matematik Tambahan dan Bahasa Inggeris/Literature in English",stpm:"STPM Sastera atau Sains; minimum PNGK 3.00",muet:"Band 3.0",extra:"UU6345007 · 7 semester · School of International Studies",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-international-affairs-management-with-honours"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Arts International and Strategic Studies",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Program aktif; syarat kemasukan Malaysia perlu disemak pada pautan entry requirement rasmi",muet:"Semak syarat bahasa rasmi semasa",extra:"Fokus hubungan antarabangsa, dasar luar, keselamatan, pertahanan dan strategi",source:"https://fass.um.edu.my/bachelor-programme-of-arts-international-and-strategic-studies"}
 ],
 dasar:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Bachelor of Public Management with Honours — laluan dasar & tadbir urus",pngk:2.75,spm:"Minimum lulus dalam satu subjek berkaitan Matematik/Perakaunan/Perdagangan/Ekonomi/Perniagaan",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 3.0; atau Band 2.0 dengan kepujian Bahasa Inggeris SPM",extra:"Dasar awam dan tadbir urus diteroka melalui program Pengurusan Awam, bukan semestinya ijazah berasingan",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-public-management-with-honours"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Political Science with Honours — laluan dasar/tadbir urus",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Program aktif; syarat khusus sesi semasa",muet:"Mengikut fakulti",extra:"Political Science UKM meliputi pengetahuan politik, penyelidikan dan pentadbiran",source:"https://www.ukm.my/studyukm/bachelor-of-social-sciences-with-honours-political-science/"}
 ],
 diplomasi:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Arts International and Strategic Studies",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Syarat kemasukan Malaysia perlu disemak pada halaman rasmi semasa",muet:"Semak syarat bahasa rasmi semasa",extra:"Prospek termasuk diplomatic services, foreign affairs, defence, intelligence dan organisasi antarabangsa",source:"https://fass.um.edu.my/bachelor-programme-of-arts-international-and-strategic-studies"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Bachelor of International Affairs Management with Honours",pngk:3.00,spm:"Kepujian Matematik/Matematik Tambahan dan Bahasa Inggeris/Literature in English",stpm:"STPM Sastera atau Sains; minimum PNGK 3.00",muet:"Band 3.0",extra:"Laluan sesuai untuk hal ehwal antarabangsa dan kerjaya diplomatik",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-international-affairs-management-with-honours"}
 ]
};
type AgroFoodProgramKey="pertanian"|"hortikultur"|"agribisnes"|"perhutanan"|"akuakultur"|"makanan"|"ladang"|"agroteknologi";
const agroFoodProgramNames:Record<AgroFoodProgramKey,string>={pertanian:"Sains Pertanian",hortikultur:"Sains Hortikultur",agribisnes:"Agribisnes / Perniagaantani",perhutanan:"Perhutanan & Industri Kayu",akuakultur:"Akuakultur & Perikanan",makanan:"Sains & Teknologi Makanan",ladang:"Pengurusan Perladangan",agroteknologi:"Teknologi Pertanian Pintar"};
const agroFoodComparisons:Record<AgroFoodProgramKey,Requirement[]>={
 pertanian:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Agricultural Science with Honours",pngk:null,spm:"Memenuhi syarat am SPM universiti",stpm:"Program sepenuh masa aktif 2026/2027; syarat khusus STPM perlu disemak melalui dokumen kemasukan sesi semasa",muet:"Mengikut syarat kemasukan UPM",extra:"Program utama Fakulti Pertanian; UPM turut menawarkan Horticulture, Agribusiness, Aquaculture, Animal Science, Plantation Management dan Smart Agriculture",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"}
 ],
 hortikultur:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Horticulture with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas UPM",stpm:"Program aktif 2026/2027; syarat khusus perlu disemak mengikut sesi",muet:"Mengikut syarat rasmi semasa",extra:"Disenaraikan di bawah Faculty of Agriculture dalam prospektus 2026/2027",source:"https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf"}
 ],
 agribisnes:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Agribusiness with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif 2026/2027; semak subjek STPM yang diterima pada sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Fokus ekonomi, pemasaran, pengurusan dan rantaian nilai agro",source:"https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf"}
 ],
 perhutanan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Forestry Science with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas universiti",stpm:"Program aktif; syarat khas kemasukan perlu disemak mengikut sesi",muet:"Mengikut syarat rasmi semasa",extra:"UPM turut menawarkan Timber Industry, Parks & Recreation Science, Environmental Management dan Environmental Science & Technology",source:"https://forenv.upm.edu.my/academic_and_student_affairs/undergraduate/programmes_courses-98"}
 ],
 akuakultur:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Aquaculture with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif di UPM; syarat STPM khusus mengikut sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Disenaraikan di Faculty of Agriculture UPM",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"},
  {uni:"Universiti Putra Malaysia Sarawak",program:"Bachelor of Science in Aquaculture with Honours",pngk:null,spm:"Syarat kemasukan perlu disemak melalui portal 2026 UPM Sarawak",stpm:"Program ditawarkan untuk ambilan 2026",muet:"Semak syarat rasmi program",extra:"Disenaraikan secara rasmi dalam 2026 Admission Intakes UPM Sarawak",source:"https://sarawak.upm.edu.my/2026_admission_intakes/programme_offer_information/programme_offered-61898"}
 ],
 makanan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Food Science and Technology with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas Fakulti Sains dan Teknologi Makanan",stpm:"Syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Program masih dalam kitaran akreditasi penuh sehingga 2027/2028; semakan kurikulum bermula 2026/2027",source:"https://food.upm.edu.my/akademik/prasiswazah/takwim_semakan_kurikulum_program_pengajian_fakulti_sains_dan_teknologi_makanan-86298"}
 ],
 ladang:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Plantation Management with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif 2026/2027; semak syarat sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Disenaraikan dalam prospektus Faculty of Agriculture 2026/2027",source:"https://pspk.upm.edu.my/upload/dokumen/20260227153441UPM_2026_2027_Prospectus.pdf"}
 ],
 agroteknologi:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Smart Agricultural Technology with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif 2026/2027; syarat subjek perlu disemak mengikut sesi",muet:"Mengikut syarat rasmi semasa",extra:"Laluan baharu yang menggabungkan pertanian dengan sensor, automasi, data dan teknologi digital",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"}
 ]
};
type VetAnimalProgramKey="dvm"|"sains_haiwan"|"kesihatan_haiwan"|"penternakan";
const vetAnimalProgramNames:Record<VetAnimalProgramKey,string>={dvm:"Doktor Perubatan Veterinar",sains_haiwan:"Sains Haiwan",kesihatan_haiwan:"Kesihatan & Kebajikan Haiwan",penternakan:"Teknologi Penternakan & Pengeluaran Ternakan"};
const vetAnimalComparisons:Record<VetAnimalProgramKey,Requirement[]>={
 dvm:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Doktor Perubatan Veterinar",pngk:3.50,spm:"Kepujian Bahasa Melayu/Bahasa Malaysia dan lulus Sejarah; syarat am universiti turut terpakai",stpm:"PNGK minimum 3.50; minimum B+ Biology dan B Chemistry, atau B+ Chemistry dan B Biology",muet:"Band 3.0",extra:"Temu duga wajib · program profesional 5 tahun",source:"https://vet.upm.edu.my/academic_members/undergraduate/admission_requirement-391?L=bm"},
  {uni:"Universiti Malaysia Kelantan (UMK)",program:"Doktor Perubatan Veterinar",pngk:null,spm:"Program sesi 2026 mempunyai syarat khusus SPM mengikut kategori kemasukan",stpm:"Syarat STPM sesi 2026 perlu disemak pada paparan kategori STPM UMK",muet:"Mengikut kategori kemasukan; program memerlukan tahap MUET yang ditetapkan",extra:"Kod UPU UL6640001 · temu duga diperlukan · program aktif sesi 2026",source:"https://study.umk.edu.my/syarat_sistem/syarat_public.cfm?prog=12&tahun=2026"}
 ],
 sains_haiwan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Animal Science with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas program",stpm:"Program aktif; syarat khusus perlu disemak dalam dokumen kemasukan sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Program aktif di Department of Animal Science; penyelaras program rasmi dikemas kini April 2026",source:"https://agri.upm.edu.my/prasiswazah/mengenai_kami/penyelaras_program_pengerusi_kurikulum-60798"}
 ],
 kesihatan_haiwan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Doctor of Veterinary Medicine — laluan kesihatan haiwan",pngk:3.50,spm:"Memenuhi syarat DVM UPM",stpm:"Minimum B+/B dalam Biology dan Chemistry seperti syarat DVM",muet:"Band 3.0",extra:"Kesihatan haiwan ialah komponen profesional dalam DVM; bukan dipersembahkan sebagai ijazah berasingan jika tiada program sarjana muda khusus",source:"https://vet.upm.edu.my/academic_members/undergraduate/admission_requirement-391?L=bm"},
  {uni:"Universiti Malaysia Kelantan (UMK)",program:"Doctor of Veterinary Medicine — laluan kesihatan haiwan",pngk:null,spm:"Syarat khusus sesi 2026 mengikut kategori kemasukan",stpm:"Masuk melalui DVM UMK",muet:"Mengikut syarat program",extra:"Program aktif dan memerlukan temu duga",source:"https://study.umk.edu.my/syarat_sistem/program_public.cfm?carian=&fak=0&jenis=IJAZAH+SARJANA+MUDA&tahun=2026"}
 ],
 penternakan:[
  {uni:"Universiti Malaysia Kelantan (UMK)",program:"Ijazah Sarjana Muda Sains Gunaan (Teknologi Penternakan) dengan Kepujian",pngk:null,spm:"Syarat khusus sesi 2026 perlu disemak pada portal UMK",stpm:"Program aktif untuk sesi 2026; syarat STPM program tersedia melalui portal kemasukan UMK",muet:"Mengikut syarat rasmi program",extra:"Fakulti Industri Asas Tani · Kod UPU UL6620001",source:"https://study.umk.edu.my/syarat_sistem/program_public.cfm?carian=&fak=0&jenis=IJAZAH+SARJANA+MUDA&tahun=2026"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Animal Science with Honours — pengeluaran ternakan",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Syarat kemasukan sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Program merangkumi sains dan pengurusan pengeluaran haiwan",source:"https://agri.upm.edu.my/undergraduate/bachelor_dissertation/bachelor_dissertation_titles-60356?L=en"}
 ]
};
type EnvironmentProgramKey="pengurusan"|"sains_teknologi"|"konservasi"|"rekreasi"|"kesihatan"|"kelestarian";
const environmentProgramNames:Record<EnvironmentProgramKey,string>={pengurusan:"Pengurusan Alam Sekitar",sains_teknologi:"Sains & Teknologi Alam Sekitar",konservasi:"Konservasi & Sumber Semula Jadi",rekreasi:"Taman, Rekreasi & Perhutanan Bandar",kesihatan:"Kesihatan Alam Sekitar & Pekerjaan",kelestarian:"Kelestarian, GIS & Pengurusan Sumber"};
const environmentComparisons:Record<EnvironmentProgramKey,Requirement[]>={
 pengurusan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Environmental Management with Honours",pngk:null,spm:"Memenuhi syarat am dan syarat khas UPM",stpm:"Program aktif; syarat khusus STPM perlu disemak dalam dokumen kemasukan sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"8 semester / 4 tahun · menggabungkan sains biofizikal, ekonomi dan sosial dengan pengurusan pembangunan lestari",source:"https://env.upm.edu.my/akademik/undergraduate/bacelor_pengurusan_alam_sekitar-1099"}
 ],
 sains_teknologi:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Environmental Science and Technology with Honours",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Program aktif; syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi UPM",extra:"Multidisiplin: sains asas, ekonomi, sains sosial, pengurusan, teknologi dan kejuruteraan; latihan profesional diwajibkan",source:"https://forenv.upm.edu.my/academic_and_student_affairs/undergraduate/programmes_courses-98"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Environmental Science)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Program aktif; syarat khusus Malaysia perlu disemak pada borang program semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"4 tahun · UKM Bangi · merangkumi biology, chemistry, earth science, pollution, GIS, remote sensing, toxicology dan EIA",source:"https://www.ukm.my/studyukm/environmental-science-bachelor-of-science-hons/"}
 ],
 konservasi:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Forestry Science with Honours — laluan konservasi & sumber",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Syarat khusus mengikut sesi kemasukan",muet:"Mengikut syarat rasmi UPM",extra:"Laluan konservasi biasanya datang melalui Forestry Science, ekologi dan pengurusan sumber",source:"https://forenv.upm.edu.my/academic_and_student_affairs/undergraduate/programmes_courses-98"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Environmental Science / Biology — laluan konservasi",pngk:null,spm:"Memenuhi syarat am program yang dipilih",stpm:"Syarat khusus mengikut program",muet:"Mengikut fakulti",extra:"Konservasi diteroka melalui Environmental Science/Biology dan bidang berkaitan, bukan semestinya ijazah berasingan",source:"https://www.ukm.my/studyukm/find-your-programme/"}
 ],
 rekreasi:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Parks & Recreation Science with Honours",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Program disenaraikan secara rasmi di Fakulti Perhutanan dan Alam Sekitar",source:"https://upm.edu.my/admission/programmes/undergraduate-75800"}
 ],
 kesihatan:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Occupational Safety and Health with Environmental Health with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat STPM Malaysia perlu disemak mengikut sesi",muet:"Mengikut syarat fakulti semasa",extra:"4 tahun · UKM Kuala Lumpur · fokus hubungan manusia-persekitaran, environmental health dan occupational safety & health",source:"https://www.ukm.my/studyukm/bachelor-of-occupational-safety-and-health-with-environmental-health-with-honours/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science Environmental & Occupational Health with Honours",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus mengikut sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Disenaraikan secara rasmi di Faculty of Medicine and Health Science",source:"https://upm.edu.my/admission/programmes/undergraduate-75800"}
 ],
 kelestarian:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Environmental Management / Environmental Science & Technology — laluan kelestarian",pngk:null,spm:"Memenuhi syarat program yang dipilih",stpm:"Syarat khusus mengikut program dan sesi",muet:"Mengikut syarat rasmi",extra:"Kelestarian diteroka melalui pembangunan lestari, pengurusan sumber, teknologi, dasar dan latihan industri",source:"https://forenv.upm.edu.my/academic_and_student_affairs/undergraduate/programmes_courses-98"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Environmental Science — laluan GIS, remote sensing & resource management",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Syarat khusus sesi semasa",muet:"Mengikut fakulti",extra:"Kursus merangkumi GIS, remote sensing, hydrology, atmospheric science, environmental risk dan EIA",source:"https://www.ukm.my/prasiswazahfst/en/environmental-science-programme/"}
 ]
};
type MarineProgramKey="marin"|"akuakultur"|"perikanan"|"ekologi"|"oseanografi"|"teknologi_laut";
const marineProgramNames:Record<MarineProgramKey,string>={marin:"Sains Marin",akuakultur:"Akuakultur",perikanan:"Sains Perikanan",ekologi:"Biologi & Ekologi Akuatik",oseanografi:"Oseanografi & Iklim Laut",teknologi_laut:"Teknologi Laut, GIS & Pengurusan Pantai"};
const marineComparisons:Record<MarineProgramKey,Requirement[]>={
 marin:[
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Bachelor in Science (Marine Science) with Honours",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"STPM Sains: minimum Gred C dalam SATU subjek daripada Biology / Physics / Chemistry / Mathematics T / Mathematics M",muet:"Band 2.0",extra:"7 semester / 3.5 tahun · merangkumi biological, physical, chemical dan geological oceanography, GIS, EIA dan marine policy",source:"https://www.umt.edu.my/sarjana-muda-sains-sains-marin-dengan-kepujian-fssm/?lang=ms"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Marine Sciences)",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains & Teknologi",stpm:"Program aktif; syarat Malaysia khusus perlu disemak mengikut sesi kemasukan",muet:"Mengikut syarat fakulti semasa",extra:"4 tahun · UKM Bangi · meliputi biologi marin, ekologi, kimia marin, geologi marin, remote sensing, GIS, oseanografi dan iklim",source:"https://www.ukm.my/studyukm/marine-sciences-bachelor-of-science-hons/"},
  {uni:"Universiti Malaysia Sabah (UMS)",program:"Bachelor of Science with Honours (Marine Science)",pngk:null,spm:"Memenuhi syarat am dan khas UMS",stpm:"Program aktif; syarat sesi semasa perlu disemak melalui kemasukan UMS",muet:"Mengikut syarat rasmi UMS",extra:"Kod UH6443003 · 4 tahun / 8 semester · program masih disenaraikan dalam prospektus terkini",source:"https://ums.edu.my/v5/en/out-campus-programme/94-admission"}
 ],
 akuakultur:[
  {uni:"Universiti Malaysia Sabah (UMS)",program:"Bachelor of Science with Honours (Aquaculture)",pngk:null,spm:"Memenuhi syarat am dan khas UMS",stpm:"Program aktif; syarat STPM perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi UMS",extra:"Kod UH6624001 · 4 tahun / 8 semester",source:"https://ums.edu.my/v5/en/out-campus-programme/94-admission"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Aquaculture with Honours",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus mengikut sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Ditawarkan di UPM dan juga UPM Sarawak untuk ambilan 2026",source:"https://webupmwww.upm.edu.my/admission/programmes/undergraduate-75800"}
 ],
 perikanan:[
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Bachelor of Applied Science (Fisheries) with Honours",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"STPM Sains: minimum Gred C dalam satu subjek yang diterima mengikut syarat program",muet:"Semak syarat rasmi program semasa",extra:"6 semester / 3 tahun · kursus merangkumi fisheries science, fish population dynamics, aquatic ecology, fish health dan fishing gear technology",source:"https://www.umt.edu.my/sarjana-muda-sains-gunaan-perikanan-dengan-kepujian-fpsm/"}
 ],
 ekologi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Science with Honours (Marine Sciences) — laluan biologi & ekologi marin",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Masuk melalui Marine Sciences UKM",muet:"Mengikut fakulti",extra:"Bidang termasuk coral reef ecology, plankton, marine invertebrates, marine biotechnology dan biodiversity",source:"https://www.ukm.my/studyukm/marine-sciences-bachelor-of-science-hons/"},
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Marine Science / Fisheries — laluan biologi akuatik",pngk:null,spm:"Memenuhi syarat program yang dipilih",stpm:"Biology/Science background mengikut program",muet:"Mengikut syarat rasmi program",extra:"UMT mempunyai kepakaran Aquatic Biology, Fish Physiology dan Taxonomy of Fishes dalam program berkaitan",source:"https://fpsm.umt.edu.my/academicians/"}
 ],
 oseanografi:[
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Bachelor in Science (Marine Science) with Honours — Oceanography",pngk:null,spm:"Memenuhi syarat am universiti",stpm:"Minimum Gred C dalam satu daripada Biology / Physics / Chemistry / Mathematics T / Mathematics M",muet:"Band 2.0",extra:"Kursus termasuk Physical Oceanography, Geological Oceanography, Chemical Oceanography, Ocean-Atmosphere-Climate dan Coastal Dynamics",source:"https://www.umt.edu.my/sarjana-muda-sains-sains-marin-dengan-kepujian-fssm/?lang=ms"}
 ],
 teknologi_laut:[
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Bachelor in Science (Marine Science) with Honours — GIS, remote sensing & coastal management",pngk:null,spm:"Memenuhi syarat am program",stpm:"Minimum Gred C dalam satu subjek Sains/Matematik yang diterima",muet:"Band 2.0",extra:"Program merangkumi Remote Sensing and GIS, Environmental Impact Assessment, Coastal Morphology and Management serta marine policy",source:"https://www.umt.edu.my/sarjana-muda-sains-sains-marin-dengan-kepujian-fssm/?lang=ms"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Marine Sciences — GIS, remote sensing & ocean climate",pngk:null,spm:"Memenuhi syarat am dan khas UKM",stpm:"Syarat khusus sesi semasa",muet:"Mengikut fakulti",extra:"Program merangkumi marine remote sensing and GIS, physical oceanography, marine meteorology dan ocean climate",source:"https://www.ukm.my/studyukm/marine-sciences-bachelor-of-science-hons/"}
 ]
};
type SocialWorkProgramKey="kerja_sosial"|"pembangunan_komuniti"|"pengurusan_pembangunan"|"pembangunan_manusia";
const socialWorkProgramNames:Record<SocialWorkProgramKey,string>={kerja_sosial:"Kerja Sosial",pembangunan_komuniti:"Pembangunan Komuniti",pengurusan_pembangunan:"Pengurusan Pembangunan",pembangunan_manusia:"Pembangunan Manusia"};
const socialWorkComparisons:Record<SocialWorkProgramKey,Requirement[]>={
 kerja_sosial:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Social Work with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Sosial & Kemanusiaan",stpm:"Program aktif; syarat khusus STPM Malaysia perlu disemak pada sesi semasa",muet:"Memenuhi minimum English requirement fakulti",extra:"3.5 tahun / 7 semester · UKM Bangi · program ditanda # dalam senarai prasiswazah UKM, menunjukkan peperiksaan/temu duga",source:"https://www.ukm.my/studyukm/social-work-bachelor-of-social-sciences-hons/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Social Work",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Syarat kemasukan perlu disemak melalui portal rasmi Pohon USM",muet:"Mengikut syarat rasmi semasa",extra:"4 tahun · 122 unit · program profesional dengan beberapa praktikum · medium utama Bahasa Malaysia",source:"https://soc.usm.my/index.php/programmes/undergraduate/bachelor-of-social-work"}
 ],
 pembangunan_komuniti:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Human Development Science with Honours — laluan pembangunan komuniti",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Program aktif; syarat kemasukan sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Kurikulum merangkumi Pengantar Pembangunan Komuniti, Polisi Sosial, Kerja Sosial & Perkhidmatan Manusia dan Perancangan Program",source:"https://www.upmet.upm.edu.my/program-bacelor-science-human-development"}
 ],
 pengurusan_pembangunan:[
  {uni:"Universiti Utara Malaysia (UUM)",program:"Sarjana Muda Pengurusan Pembangunan dengan Kepujian",pngk:2.75,spm:"Sekurang-kurangnya lulus satu daripada Mathematics / Additional Mathematics / Prinsip Perakaunan / Perdagangan / Ekonomi Asas / Lukisan Kejuruteraan / Ekonomi / Perniagaan",stpm:"STPM Sastera atau Sains; minimum PNGK 2.75",muet:"Band 2.0; atau lulus Bahasa Inggeris SPM mengikut laluan yang dinyatakan program",extra:"UU6345008 · 7 semester",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local/local/bachelor-of-development-management-with-honours"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Social Sciences in Development Science with Honours",pngk:null,spm:"Memenuhi syarat am dan khas FSSK",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut keperluan fakulti",extra:"3.5 tahun / 7 semester · pembangunan bandar/luar bandar, dasar, sumber dan perancangan",source:"https://www.ukm.my/studyukm/developmental-science-bachelor-of-social-sciences-hons/"}
 ],
 pembangunan_manusia:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Human Development Science with Honours",pngk:null,spm:"Memenuhi syarat am dan khas program",stpm:"Program aktif pada 2026; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Bidang meliputi perkembangan manusia, keluarga, demografi, psikologi sosial, perkhidmatan manusia dan komuniti",source:"https://www.upmet.upm.edu.my/program-bacelor-science-human-development"},
  {uni:"Universiti Putra Malaysia Sarawak",program:"Bachelor of Human Development Science with Management Honours",pngk:null,spm:"Syarat khusus perlu disemak pada portal 2026 UPM Sarawak",stpm:"Program ditawarkan untuk ambilan 2026",muet:"Mengikut syarat rasmi program",extra:"Disenaraikan secara rasmi dalam 2026 Admission Intakes UPM Sarawak",source:"https://sarawak.upm.edu.my/academic/undergraduate_info/2026_admission_intakes-61955"}
 ]
};
type InfoScienceProgramKey="library"|"records"|"systems"|"content"|"archives";
const infoScienceProgramNames:Record<InfoScienceProgramKey,string>={library:"Pengurusan Perpustakaan",records:"Pengurusan Rekod",systems:"Pengurusan Sistem Maklumat",content:"Pengurusan Kandungan Maklumat",archives:"Arkib, Dokumentasi & Kurasi Digital"};
const infoScienceComparisons:Record<InfoScienceProgramKey,Requirement[]>={
 library:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Library Management — SI260",pngk:2.30,spm:"Memenuhi syarat am UiTM; semak syarat SPM khusus program semasa",stpm:"PNGK minimum 2.30 dengan Gred C (NGMP 2.00) dalam tiga subjek termasuk Pengajian Am",muet:"Mengikut syarat rasmi program",extra:"Lokasi termasuk Puncak Perdana, Sungai Petani dan Rembau",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si260"}
 ],
 records:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Records Management — SI261",pngk:2.30,spm:"Kepujian Bahasa Melayu dan Bahasa Inggeris serta lulus Mathematics/Additional Mathematics",stpm:"PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am",muet:"Band 2.0",extra:"3 tahun · Puncak Perdana / Segamat · kursus termasuk Electronic Records Management, Digital Information Forensics dan Archival Preservation",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si-261"}
 ],
 systems:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Information Systems Management — SI262",pngk:2.30,spm:"Memenuhi syarat am UiTM dan syarat khas program",stpm:"PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am",muet:"Mengikut syarat rasmi program",extra:"3 tahun · Puncak Perdana",source:"https://fis.uitm.edu.my/component/sppagebuilder/page/232"}
 ],
 content:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Information Science (Honours) Information Content Management — SI263",pngk:2.30,spm:"Memenuhi syarat am UiTM dan syarat khas program",stpm:"PNGK minimum 2.30 dengan Gred C dalam tiga subjek termasuk Pengajian Am",muet:"Mengikut syarat rasmi program",extra:"3 tahun · Puncak Perdana",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si-263"}
 ],
 archives:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Records Management — laluan Arkib & Dokumentasi",pngk:2.30,spm:"Kepujian Bahasa Melayu dan Bahasa Inggeris; lulus Mathematics/Additional Mathematics",stpm:"Masuk melalui Bachelor of Information Science (Honours) Records Management",muet:"Band 2.0",extra:"Bidang merangkumi Archival Arrangement & Description, Archival Preservation, Oral History & Cultural Heritage dan Digital Information Forensics",source:"https://fis.uitm.edu.my/academics/undergraduate-degree/si-261"}
 ]
};
type CreativeProgramKey="seni_halus"|"grafik"|"industri"|"media_baharu"|"senibina"|"landskap"|"animasi_game";
const creativeProgramNames:Record<CreativeProgramKey,string>={seni_halus:"Seni Halus",grafik:"Reka Bentuk Grafik & Komunikasi Visual",industri:"Reka Bentuk Industri",media_baharu:"Media Baharu & Multimedia Kreatif",senibina:"Seni Bina",landskap:"Seni Bina Landskap",animasi_game:"Animasi & Reka Bentuk Permainan"};
const creativeComparisons:Record<CreativeProgramKey,Requirement[]>={
 seni_halus:[
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Arts in Fine Arts with Honours",pngk:2.00,spm:"Kredit Bahasa Malaysia; syarat am universiti turut terpakai",stpm:"STPM minimum PNGK 2.00",muet:"Band 1.0",extra:"Temu duga & audition + portfolio seni/reka bentuk; program meliputi painting, sculpture, drawing, printmaking dan photography",source:"https://arts.usm.my/index.php/programmes/undergraduate/ba-hons-fine-arts"}
 ],
 grafik:[
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Fine Arts in Communication Graphics with Honours",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Syarat khusus perlu disemak pada portal kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Program aktif dan disenaraikan secara rasmi oleh School of The Arts USM",source:"https://admission.usm.my/undergraduate/undergraduate-international"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Graphic Design (Honours) — AD261",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat kemasukan rasmi program perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat program",extra:"Program aktif; disenaraikan dalam kemas kini rasmi UiTM 4 September 2026",source:"https://apply-iceps.uitm.edu.my/index.php/component/sppagebuilder/?id=40&view=page"}
 ],
 industri:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Industrial Design with Honours",pngk:null,spm:"Memenuhi syarat am dan khas Fakulti Rekabentuk dan Senibina",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Program aktif di Faculty of Design and Architecture",source:"https://frsb.upm.edu.my/academic/undergraduate-674"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Industrial Design Technology (Honours) — AD264",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat kemasukan rasmi program perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat program",extra:"Program aktif; disenaraikan dalam kemas kini rasmi 4 September 2026",source:"https://apply-iceps.uitm.edu.my/index.php/component/sppagebuilder/?id=40&view=page"}
 ],
 media_baharu:[
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Fine Arts (Honours) (New Media Design and Technology)",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Syarat khusus perlu disemak pada portal kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Meliputi interactive websites, mobile apps, AR/VR, animation, UX dan digital media production",source:"https://arts.usm.my/index.php/programmes/undergraduate/bfa-hons-new-media-design-technology"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor in Creative Photomedia (Honours) — AD267",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat rasmi perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat program",extra:"Program kreatif digital/photomedia aktif pada 2026",source:"https://apply-iceps.uitm.edu.my/index.php/component/sppagebuilder/?id=40&view=page"}
 ],
 senibina:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science in Architecture with Honours",pngk:null,spm:"Memenuhi syarat am dan khas Fakulti Rekabentuk dan Senibina",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"Program aktif di Faculty of Design and Architecture UPM",source:"https://frsb.upm.edu.my/academic/undergraduate-674"}
 ],
 landskap:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Landscape Architecture with Honours",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UPM",extra:"4 tahun / 8 semester / 129 kredit",source:"https://frsb.upm.edu.my/academic/undergraduate/bachelor_of_landscape_architecture_with_honours-77862?L=bm"}
 ],
 animasi_game:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Creative Game Design (Honours) — AD233",pngk:null,spm:"Syarat khusus UiTM perlu dipenuhi",stpm:"Syarat rasmi perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat program",extra:"Program aktif; disenaraikan dalam kemas kini rasmi 4 September 2026",source:"https://apply-iceps.uitm.edu.my/index.php/component/sppagebuilder/?id=40&view=page"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Bachelor of Fine Arts (Honours) (New Media Design and Technology) — animation pathway",pngk:null,spm:"Memenuhi syarat am dan khas USM",stpm:"Syarat khusus semasa perlu disemak",muet:"Mengikut syarat rasmi program",extra:"Program merangkumi animation, AR/VR dan digital media production",source:"https://arts.usm.my/index.php/programmes/undergraduate/bfa-hons-new-media-design-technology"}
 ]
};
type AlliedHealthProgramKey="bioperubatan"|"dietetik"|"pemakanan"|"fisioterapi"|"cara_kerja"|"pengimejan"|"audiologi"|"kesihatan_persekitaran";
const alliedHealthProgramNames:Record<AlliedHealthProgramKey,string>={bioperubatan:"Sains Bioperubatan",dietetik:"Dietetik",pemakanan:"Pemakanan & Kesihatan Komuniti",fisioterapi:"Fisioterapi",cara_kerja:"Terapi Cara Kerja",pengimejan:"Pengimejan Diagnostik & Radioterapi",audiologi:"Audiologi",kesihatan_persekitaran:"Kesihatan Alam Sekitar & Pekerjaan"};
const alliedHealthComparisons:Record<AlliedHealthProgramKey,Requirement[]>={
 bioperubatan:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Biomedical Science with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada paparan rasmi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · bidang kesihatan berasaskan sains makmal dan diagnostik",source:"https://www.ukm.my/studyukm/bachelor-of-biomedical-science-with-honours/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Biomedical Sciences with Honors",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi UPM",extra:"Program diakreditasi oleh Institute of Biomedical Science (UK); merangkumi anatomy, physiology, biotechnology, molecular biology, pharmacology, toxicology dan diagnostics",source:"https://medic.upm.edu.my/academic/undergraduate/bachelor_of_biomedical_sciences_with_honors-2485"}
 ],
 dietetik:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Dietetics with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; latar Biology/Chemistry/Mathematics/Physics diperlukan mengikut syarat fakulti",muet:"Mengikut syarat fakulti semasa",extra:"4 tahun / 8 semester · termasuk latihan pemakanan klinikal dan kaunseling pesakit",source:"https://www.ukm.my/studyukm/bachelor-of-dietetics-with-honours/"}
 ],
 pemakanan:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science Nutrition and Community Health with Honors",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus perlu disemak pada sesi kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"4 tahun / 142 kredit · termasuk industrial training di agensi kerajaan dan bukan kerajaan",source:"https://medic.upm.edu.my/akademik/pra_siswazah/bacelor_sains_pemakanan_dan_kesihatan_komuniti_dengan_kepujian-830?L=en"}
 ],
 fisioterapi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Physiotherapy with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · fokus assessment, treatment dan rehabilitation",source:"https://www.ukm.my/studyukm/bachelor-of-physiotherapy-with-honours/"}
 ],
 cara_kerja:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Occupational Therapy with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · latihan untuk membantu klien mencapai fungsi harian optimum",source:"https://www.ukm.my/studyukm/bachelor-of-occupational-therapy-with-honours/"}
 ],
 pengimejan:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Diagnostic Imaging and Radiotherapy with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; latar Biology/Chemistry/Mathematics/Physics diperlukan mengikut syarat fakulti",muet:"Mengikut syarat fakulti",extra:"4 tahun · meliputi X-ray, CT, MRI, ultrasound, nuclear medicine dan radiotherapy",source:"https://www.ukm.my/studyukm/bachelor-of-diagnostic-imaging-and-radiotherapy-with-honours/"}
 ],
 audiologi:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Audiology with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat Malaysia khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat fakulti",extra:"4 tahun · program audiologi profesional berkaitan penilaian, diagnosis dan pengurusan masalah pendengaran/keseimbangan",source:"https://www.ukm.my/studyukm/bachelor-of-audiology-with-honours/"}
 ],
 kesihatan_persekitaran:[
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Bachelor of Occupational Safety and Health with Environmental Health with Honours",pngk:null,spm:"Memenuhi syarat am universiti dan syarat khas Fakulti Sains Kesihatan",stpm:"Program aktif; syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat fakulti",extra:"4 tahun · UKM Kuala Lumpur · gabungan environmental health dan occupational safety & health",source:"https://www.ukm.my/studyukm/bachelor-of-occupational-safety-and-health-with-environmental-health-with-honours/"},
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bachelor of Science Environmental & Occupational Health with Honours",pngk:null,spm:"Memenuhi syarat am dan khas UPM",stpm:"Program aktif; syarat khusus perlu disemak pada sesi semasa",muet:"Mengikut syarat rasmi UPM",extra:"Disenaraikan dalam program prasiswazah Fakulti Perubatan dan Sains Kesihatan",source:"https://upm.edu.my/admission/programmes/undergraduate-75800"}
 ]
};
type SportProgramKey="sains_sukan"|"pengurusan_sukan"|"kesihatan_kecergasan"|"pendidikan_sukan"|"pendidikan_jasmani"|"kejurulatihan";
const sportProgramNames:Record<SportProgramKey,string>={sains_sukan:"Sains Sukan",pengurusan_sukan:"Pengurusan Sukan",kesihatan_kecergasan:"Kesihatan & Kecergasan",pendidikan_sukan:"Pendidikan Sains Sukan",pendidikan_jasmani:"Pendidikan Jasmani",kejurulatihan:"Sains Kejurulatihan"};
const sportComparisons:Record<SportProgramKey,Requirement[]>={
 sains_sukan:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Sports Science (Hons.) — SR243",pngk:null,spm:"Memenuhi syarat am dan syarat khas UiTM",stpm:"Syarat STPM rasmi perlu disemak melalui saluran kemasukan UiTM/UPU",muet:"Mengikut syarat rasmi program",extra:"Program aktif 2026; kursus termasuk physiology, biomechanics, sport psychology, nutrition, performance analysis dan rehabilitation",source:"https://sports.uitm.edu.my/index.php/component/content/article/195-sr-243-bachelor-of-sports-science-hons-2?Itemid=101&layout=edit"}
 ],
 pengurusan_sukan:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor of Sports Management (Hons.) — SR241",pngk:null,spm:"Memenuhi syarat am dan khas UiTM",stpm:"Program aktif dan disenaraikan secara rasmi pada 2026",muet:"Mengikut syarat rasmi program",extra:"Program aktif di Faculty of Sports Science and Recreation",source:"https://sports.uitm.edu.my/index.php/programme"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Sports Management",pngk:null,spm:"Penglibatan aktif dalam sukan perlu dibuktikan; syarat akademik sesi semasa perlu disemak",stpm:"Program menerima aliran Sains/Sastera; syarat lama menunjukkan penglibatan aktif sukan sebagai syarat tambahan",muet:"Dokumen kemasukan terdahulu menetapkan Band 3.0; semak sesi semasa",extra:"Program aktif dalam brosur prasiswazah UM 2026; ujian bertulis/fizikal dan temu duga pernah dinyatakan dalam syarat kemasukan",source:"https://study.um.edu.my/doc/brochures/brochure-undergraduate-2026.pdf"}
 ],
 kesihatan_kecergasan:[
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Bachelor in Health and Fitness (Honours) — SR245",pngk:null,spm:"Memenuhi syarat am dan khas UiTM",stpm:"Program aktif; syarat khusus perlu disemak melalui UiTM/UPU",muet:"Mengikut syarat rasmi program",extra:"Program aktif dalam senarai rasmi Faculty of Sports Science and Recreation",source:"https://sports.uitm.edu.my/index.php/programme"},
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Exercise Science",pngk:null,spm:"Memenuhi syarat am dan khas UM",stpm:"Program aktif dalam brosur prasiswazah UM 2026",muet:"Semak syarat bahasa rasmi semasa",extra:"Laluan Exercise Science berbeza daripada Sports Management",source:"https://study.um.edu.my/doc/brochures/brochure-undergraduate-2026.pdf"}
 ],
 pendidikan_sukan:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Sarjana Muda Pendidikan (Sains Sukan) dengan Kepujian",pngk:null,spm:"Minimum C Matematik dan minimum E satu subjek Sains/Sains Sukan/Fizik/Kimia/Biologi",stpm:"Memenuhi syarat am STPM universiti",muet:"Band 2.0",extra:"Sekurang-kurangnya mewakili daerah dalam sukan; MEdSI + temu duga + ujian khas; syarat kesihatan fizikal turut terpakai",source:"https://fssk.upsi.edu.my/?lang=ms&page_id=272"}
 ],
 pendidikan_jasmani:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Program Pendidikan Jasmani",pngk:null,spm:"Syarat khusus semasa perlu disemak melalui Fakulti Sains Sukan & Kejurulatihan",stpm:"Program berkaitan pendidikan sukan menerima calon tertakluk syarat universiti",muet:"Mengikut syarat program",extra:"Bidang melibatkan pedagogi, pergerakan, pendidikan kesihatan dan rekreasi",source:"https://fssk.upsi.edu.my/"}
 ],
 kejurulatihan:[
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Program Sains Kejurulatihan",pngk:null,spm:"Syarat khusus sesi semasa perlu disemak",stpm:"Syarat kemasukan bergantung pada program yang dipilih",muet:"Mengikut syarat rasmi UPSI",extra:"Bidang kepakaran fakulti termasuk coaching science, performance analysis, motor learning dan conditioning",source:"https://fssk.upsi.edu.my/"}
 ],
};
type IslamicStudiesProgramKey="syariah"|"fiqh_fatwa"|"usuluddin"|"dakwah"|"muamalat"|"halal";
const islamicStudiesProgramNames:Record<IslamicStudiesProgramKey,string>={syariah:"Syariah",fiqh_fatwa:"Fiqh & Fatwa",usuluddin:"Usuluddin",dakwah:"Dakwah & Pembangunan Insan",muamalat:"Muamalat & Kewangan Islam",halal:"Industri Halal"};
const islamicStudiesComparisons:Record<IslamicStudiesProgramKey,Requirement[]>={
 syariah:[
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Bachelor of Law and Shariah with Honours",pngk:null,spm:"Bahasa Arab dan subjek Pengajian Islam berkaitan perlu memenuhi syarat khusus program",stpm:"Syarat STPM khusus perlu disemak pada portal kemasukan USIM semasa",muet:"Mengikut syarat rasmi program",extra:"Program dwi-major Undang-undang dan Syariah; diiktiraf LKPU pada Januari 2021",source:"https://fsu.usim.edu.my/undergraduate-programmes/program-sarjana-muda/"}
 ],
 fiqh_fatwa:[
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Bachelor of Fiqh and Fatwa with Honours",pngk:null,spm:"Syarat Bahasa Arab dan Pengajian Islam perlu dipenuhi mengikut kategori kemasukan",stpm:"Syarat khusus program perlu disemak pada portal kemasukan semasa",muet:"Mengikut syarat rasmi program",extra:"Kod UQ6221003 · 4 tahun / 8 semester · 143 kredit",source:"https://admission.usim.edu.my/program-details/?pid=20"}
 ],
 usuluddin:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Usuluddin",pngk:null,spm:"Memenuhi syarat am dan khas Akademi Pengajian Islam UM",stpm:"Syarat program semasa perlu disemak melalui kemasukan UM",muet:"Mengikut syarat rasmi semasa",extra:"Dua trek: Islamic Thought & Spiritual Studies; Da'wah & Human Development",source:"https://apium.um.edu.my/department-of-usuluddin-and-da-wah"}
 ],
 dakwah:[
  {uni:"Universiti Malaya (UM)",program:"Bachelor of Usuluddin — Da'wah and Human Development",pngk:null,spm:"Memenuhi syarat am dan khas Akademi Pengajian Islam",stpm:"Syarat khusus sesi semasa perlu disemak",muet:"Mengikut syarat rasmi UM",extra:"Trek khusus pada peringkat sarjana muda di Department of Usuluddin and Da'wah",source:"https://apium.um.edu.my/department-of-usuluddin-and-da-wah"}
 ],
 muamalat:[
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Program berkaitan Syariah/Muamalat dan kewangan Islam",pngk:null,spm:"Syarat Bahasa Arab dan subjek Pengajian Islam mengikut program",stpm:"Syarat khas program perlu disemak pada portal kemasukan USIM",muet:"Mengikut syarat rasmi program",extra:"Laluan Muamalat perlu dipadankan dengan nama program sebenar semasa; jangan disamakan dengan Fiqh & Fatwa atau Halal Industry",source:"https://admission.usim.edu.my/undergraduate-studies/"}
 ],
 halal:[
  {uni:"Universiti Sains Islam Malaysia (USIM)",program:"Bachelor of Syariah (Halal Industry) with Honours",pngk:null,spm:"Syarat khusus merangkumi Bahasa Arab, Bahasa Inggeris dan subjek Sains/Pengajian Islam mengikut laluan",stpm:"Dokumen syarat menunjukkan bagi laluan STPM Sastera sekurang-kurangnya C+ dalam Bahasa Arab dan Syariah; semak syarat sesi semasa sebelum memohon",muet:"Dokumen syarat terdahulu menetapkan Band 3; semak semasa",extra:"4 tahun · mod 3u1i: 3 tahun universiti + 1 tahun industri · akreditasi penuh MQA",source:"https://fsu.usim.edu.my/undergraduate/bachelor-of-syariah-halal-industry-with-honours/"}
 ],
};
type EngineeringProgramKey="elektrik"|"mekanikal"|"awam"|"kimia"|"mekatronik"|"komputer"|"pembuatan"|"bahan"|"aeroangkasa"|"automotif"|"bioperubatan"|"alam_sekitar"|"petroleum"|"marin"|"telekomunikasi";
const engineeringProgramNames:Record<EngineeringProgramKey,string>={elektrik:"Kejuruteraan Elektrik / Elektrik dan Elektronik",mekanikal:"Kejuruteraan Mekanikal",awam:"Kejuruteraan Awam",kimia:"Kejuruteraan Kimia",mekatronik:"Kejuruteraan Mekatronik",komputer:"Kejuruteraan Komputer",pembuatan:"Kejuruteraan Pembuatan",bahan:"Kejuruteraan Bahan",aeroangkasa:"Kejuruteraan Aeroangkasa",automotif:"Kejuruteraan Automotif",bioperubatan:"Kejuruteraan Bioperubatan",alam_sekitar:"Kejuruteraan Alam Sekitar",petroleum:"Kejuruteraan Petroleum",marin:"Kejuruteraan Marin / Seni Bina Kapal",telekomunikasi:"Teknologi Kejuruteraan Telekomunikasi"};
const engineeringComparisons:Record<EngineeringProgramKey,Requirement[]>={
 elektrik:comparisons.jurutera,
 mekanikal:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Kejuruteraan Mekanikal",pngk:3.00,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum Gred B dalam Mathematics (T) dan Physics",muet:"Band 3.0",extra:"Syarat program dirujuk melalui halaman rasmi kemasukan UM 2026",source:"https://study.um.edu.my/undergraduates-faculties"},
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Mekanikal dengan Kepujian",pngk:2.80,spm:"Kepujian Matematik dan Fizik serta memenuhi syarat am universiti",stpm:"Minimum Gred B dalam Mathematics (T), Physics dan Chemistry bagi laluan Sains",muet:"Band 1.0",extra:"Ditawarkan di kampus Johor Bahru",source:"https://admission.utm.my/entry-requirements-ug-malaysian/",spmRules:[{subject:"Matematik",minimum:"C"},{subject:"Fizik",minimum:"C"}]},
 {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Kejuruteraan Mekanikal dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah; Gred C Fizik SPM bagi laluan STPM Biology",stpm:"Gred C dalam Pengajian Am, Mathematics dan kombinasi Physics/Chemistry yang ditetapkan",muet:"Band 2.0",extra:"Kod UC6521001 / BMKU · 8 semester · sumber rasmi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html"}
 ,{uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Mekanikal dengan Kepujian",pngk:null,spm:"Syarat Matematik dan Sains mengikut ketetapan program",stpm:"Laluan STPM Sains; gred khusus tidak diterbitkan pada brosur ringkas",muet:"Tiada makluman rasmi",extra:"Program Saluran Perdana 2026/2027 · 4 tahun",source:"https://pohon.usm.my/dokumendoc/2026_2027/Brochure_Saluran%20Perdana%20_Final.pdf"}
 ],
 awam:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Kejuruteraan Awam dengan Kepujian",pngk:2.00,merit:96.81,spm:"Memenuhi syarat am SPM universiti",stpm:"Aliran Sains; Physics/Mathematics T dan gred subjek khusus seperti dalam buku syarat 2026",muet:"Band 1.0",extra:"Kod UP6526001 · program bertanda # · purata merit UPU tahun 2026",source:"https://online.mohe.gov.my/epanduan/ProgramPengajian/kategoriCalon/N?jenprog=stpm"},
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Awam dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu; lulus Sejarah",stpm:"Gred C Pengajian Am dan dua subjek; syarat khas Sains program perlu dipenuhi",muet:"Band 1.0",extra:"Ditawarkan di kampus Johor Bahru",source:"https://admission.utm.my/entry-requirements-ug-malaysian/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Awam dengan Kepujian",pngk:null,spm:"Kepujian Bahasa Melayu dan Matematik; lulus Sejarah",stpm:"Keutamaan kepada calon berlatarbelakang Sains Tulen",muet:"Band 2.0",extra:"Kod US6526002 · 4 tahun · halaman rasmi USM tidak memaparkan PNGK STPM khusus",source:"https://admission.usm.my/index.php/alternative-second-channel/us6526002-sarjana-muda-kejuruteraan-awam-dengan-kepujian-2",spmRules:[{subject:"Bahasa Melayu",minimum:"C"},{subject:"Matematik",minimum:"C"}]}
 ],
 kimia:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Kejuruteraan Kimia dengan Kepujian",pngk:2.00,merit:99.43,spm:"Memenuhi syarat am SPM universiti",stpm:"Memenuhi kombinasi dan gred mata pelajaran Sains yang ditetapkan dalam buku syarat UPM 2026",muet:"Band 3.0",extra:"Kod UP6524001 · 8 semester · purata merit UPU tahun 2026",source:"https://online.mohe.gov.my/epanduan/ProgramPengajian/kategoriCalon/N?jenprog=stpm"},
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Kimia (Bioproses) dengan Kepujian",pngk:3.00,spm:"Memenuhi syarat am SPM universiti",stpm:"Minimum B- dalam Mathematics/Additional Mathematics, Chemistry/Engineering Chemistry dan satu daripada Physics/Engineering Physics/Biology",muet:"Band 1.0",extra:"Syarat khusus program disahkan pada halaman rasmi Fakulti Kejuruteraan Kimia dan Tenaga UTM",source:"https://fkt.utm.my/bachelor-of-engineering-chemical-bioprocess/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Kimia dengan Kepujian",pngk:3.33,spm:"Kepujian Matematik",stpm:"Minimum B+ dalam Pengajian Am dan mana-mana dua: Biology, Physics, Chemistry atau Mathematics T/Further Mathematics T",muet:"Memenuhi syarat am universiti",extra:"Kod US6524001 · hanya laluan STPM, Matrikulasi/Asasi dan A-Level/IB/AUSMAT dinyatakan",source:"https://chemical.eng.usm.my/academic-programs/undergraduate/new-undergraduate-faq",spmRules:[{subject:"Matematik",minimum:"C"}]}
 ],
 mekatronik:[
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Kejuruteraan Mekatronik dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu; lulus Sejarah. Calon laluan Biology STPM perlu kepujian Physics SPM",stpm:"Minimum C dalam Mathematics (M/T), Physics dan Chemistry; atau Mathematics (M/T), Chemistry dan Biology",muet:"Band 2.0",extra:"Kod UC6523002 / BELM · 8 semester · syarat rasmi sesi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]},
 {uni:"Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)",program:"Sarjana Muda Kejuruteraan Mekatronik dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu; lulus Sejarah. Calon tanpa Physics STPM perlu kepujian Physics SPM",stpm:"Minimum C dalam Mathematics T, Physics dan Chemistry; atau Mathematics T, Chemistry dan Biology",muet:"Band 2.0",extra:"Calon tanpa Physics STPM perlu mengambil Basic Physics di universiti",source:"https://admission.umpsa.edu.my/undergraduate-study/engineering/06-b-eng-hons-mechatronics-engineering",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]}
 ,{uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Mekatronik dengan Kepujian",pngk:null,spm:"Syarat Matematik dan Sains tertakluk syarat khusus program",stpm:"Kombinasi Mathematics dan subjek Sains mengikut syarat program",muet:"Tiada makluman rasmi",extra:"Kod US6523001 · program meliputi elektrik, elektronik, mekanikal, komputer, kawalan dan robotik",source:"https://admission.usm.my/index.php/course-ug/us6523001-sarjana-muda-kejuruteraan-mekatronik-dengan-kepujian-upu"}
 ,{uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan (Elektrik–Mekatronik) dengan Kepujian",pngk:null,spm:"Memenuhi syarat am dan syarat Matematik/Sains program",stpm:"Mathematics dan kombinasi subjek Sains yang ditetapkan",muet:"Tertakluk syarat rasmi kemasukan 2026/2027",extra:"Program empat tahun di kampus utama Johor Bahru",source:"https://fke.utm.my/undergraduate/bachelor-of-engineering-electrical-mechatronics-skem/"}
 ],
 komputer:[
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Sarjana Muda Kejuruteraan Komputer dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu; lulus Sejarah. Laluan Biology STPM memerlukan kepujian Physics SPM",stpm:"Minimum C dalam Mathematics (M/T), Physics dan Chemistry; atau Mathematics (M/T), Chemistry dan Biology",muet:"Band 2.0",extra:"Kod UC6523001 / BERR · 8 semester · syarat rasmi sesi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]},
  {uni:"Universiti Malaysia Perlis (UniMAP)",program:"Sarjana Muda Kejuruteraan Komputer dengan Kepujian",pngk:null,spm:"Syarat khusus SPM tidak dinyatakan pada halaman program",stpm:"Program memberi tumpuan kepada reka bentuk perkakasan, perisian, sistem terbenam dan sistem komputer",muet:"Tiada makluman rasmi",extra:"Kod UR6523002 · halaman rasmi mengesahkan nama program tetapi tidak memaparkan PNGK atau gred kemasukan khusus",source:"https://www.unimap.edu.my/index.php/en/rk20-bachelor-of-computer-engineering-with-honours"}
 ],
 pembuatan:[
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Kejuruteraan Pembuatan dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu; lulus Sejarah. Laluan Biology STPM memerlukan kepujian Physics SPM",stpm:"Minimum C dalam Mathematics (M/T), Physics dan Chemistry; atau Mathematics (M/T), Chemistry dan Biology",muet:"Band 2.0",extra:"Kod UC6540001 / BMIG · 8 semester · syarat rasmi sesi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]},
 {uni:"Universiti Malaysia Perlis (UniMAP)",program:"Sarjana Muda Kejuruteraan Pembuatan dengan Kepujian",pngk:null,spm:"Syarat khusus SPM tidak dinyatakan pada halaman program",stpm:"Program merangkumi bahan, proses dan teknologi pembuatan, sistem pembuatan serta pengurusan pembuatan",muet:"Tiada makluman rasmi",extra:"Kod UR6540001 · halaman rasmi mengesahkan program tetapi tidak memaparkan PNGK atau gred kemasukan khusus",source:"https://fktm.unimap.edu.my/index.php/academics/undergraduate/engineering/bachelor-of-manufacturing-engineering-with-honours"}
 ,{uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Mekanikal (Pembuatan) dengan Kepujian",pngk:null,spm:"Memenuhi syarat am serta syarat Matematik dan Sains program",stpm:"Mathematics dan kombinasi Physics/Chemistry yang ditetapkan",muet:"Tertakluk syarat rasmi kemasukan 2026/2027",extra:"Penawaran program disahkan pada senarai rasmi program UTM",source:"https://admission.utm.my/offered-allcourses-malaysian/"}
 ],
 bahan:[
  {uni:"Universiti Malaysia Perlis (UniMAP)",program:"Sarjana Muda Kejuruteraan Bahan dengan Kepujian",pngk:null,spm:"Syarat khusus SPM tidak dinyatakan pada halaman program",stpm:"Bidang meliputi sifat, pengujian, pemilihan, pemprosesan dan aplikasi bahan",muet:"Tiada makluman rasmi",extra:"Kod UR6527001 · program dan bidang pengajian disahkan pada halaman rasmi UniMAP",source:"https://www.unimap.edu.my/index.php/en/rk12-bachelor-of-materials-engineering-with-honours"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Bahan dengan Kepujian",pngk:null,spm:"Syarat khusus SPM saluran perdana tidak dinyatakan dalam brosur program",stpm:"Terbuka kepada lepasan STPM melalui Saluran Perdana 2026/2027",muet:"Tiada makluman rasmi",extra:"Kod US6527001 · 8 semester / 4 tahun · tidak menggunakan syarat Saluran Warga Sukan sebagai syarat UPU biasa",source:"https://pohon.usm.my/dokumendoc/2026_2027/Brochure_Saluran%20Perdana%20_Final.pdf"}
 ],
 aeroangkasa:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Kejuruteraan Aeroangkasa dengan Kepujian",pngk:null,spm:"Syarat Sains dan Matematik mengikut ketetapan program",stpm:"Kombinasi Mathematics, Physics dan Chemistry yang ditetapkan bagi laluan Sains",muet:"Tiada makluman rasmi",extra:"Program ditawarkan oleh Fakulti Kejuruteraan; syarat angka hanya dipaparkan apabila diterbitkan dalam buku rasmi 2026",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Sarjana Muda Kejuruteraan Aeroangkasa dengan Kepujian",pngk:null,spm:"Syarat khusus SPM tidak dinyatakan dalam brosur ringkas",stpm:"Terbuka kepada lepasan STPM melalui Saluran Perdana 2026/2027",muet:"Tiada makluman rasmi",extra:"Tempoh 4 tahun; maklumat program disahkan melalui brosur rasmi Saluran Perdana",source:"https://pohon.usm.my/dokumendoc/2026_2027/Brochure_Saluran%20Perdana%20_Final.pdf"}
 ,{uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Aeronautik dengan Kepujian",pngk:null,spm:"Memenuhi syarat am serta syarat Matematik dan Fizik program",stpm:"Mathematics, Physics dan kombinasi Sains yang ditetapkan",muet:"Tertakluk syarat rasmi kemasukan 2026/2027",extra:"Penawaran program disahkan pada senarai rasmi program UTM",source:"https://admission.utm.my/offered-allcourses-malaysian/"}
 ],
 automotif:[
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Sarjana Muda Kejuruteraan Automotif dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah; laluan Biology STPM memerlukan kepujian Physics SPM",stpm:"Minimum C dalam Mathematics (M/T), Physics dan Chemistry; atau Mathematics (M/T), Chemistry dan Biology",muet:"Band 2.0",extra:"Kod UC6525001 / BMKK · 8 semester · syarat rasmi sesi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"}]},
  {uni:"Universiti Malaysia Perlis (UniMAP)",program:"Sarjana Muda Teknologi Automotif dengan Kepujian",pngk:null,spm:"Syarat khusus SPM tidak dinyatakan pada senarai program",stpm:"Kelayakan khusus tidak dipaparkan pada halaman senarai program",muet:"Tiada makluman rasmi",extra:"Kod UR6525001 · penawaran program disahkan pada laman rasmi UniMAP",source:"https://www.unimap.edu.my/index.php/en/list-of-study-programmes-offered"}
 ],
 bioperubatan:[
  {uni:"Universiti Malaya (UM)",program:"Sarjana Muda Kejuruteraan Bioperubatan",pngk:null,spm:"Syarat Sains dan Matematik tertakluk syarat khas program",stpm:"Mathematics dan subjek Sains yang ditetapkan oleh program",muet:"Tiada makluman rasmi",extra:"Penawaran program disahkan melalui senarai rasmi program prasiswazah UM",source:"https://study.um.edu.my/undergraduates-faculties"}
 ,{uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Bioperubatan dengan Kepujian",pngk:null,spm:"Memenuhi syarat am dan syarat Matematik/Sains program",stpm:"Mathematics dan kombinasi subjek Sains yang ditetapkan",muet:"Tertakluk syarat rasmi kemasukan 2026/2027",extra:"Program diiktiraf dan disenaraikan oleh Fakulti Kejuruteraan Elektrik UTM",source:"https://fke.utm.my/programme-arccreditation/"}
 ],
 alam_sekitar:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Bacelor Kejuruteraan Awam dengan pengajian berkaitan alam sekitar",pngk:null,spm:"Syarat Sains dan Matematik mengikut program",stpm:"Kombinasi subjek Sains yang ditetapkan",muet:"Tiada makluman rasmi",extra:"Rujuk struktur/pengkhususan program pada sumber rasmi; tidak dianggap program berasingan jika universiti tidak menamakannya demikian",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"}
 ],
 petroleum:[
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Petroleum dengan Kepujian",pngk:null,spm:"Memenuhi syarat am dan syarat Sains/Matematik program",stpm:"Mathematics, Physics dan Chemistry mengikut kombinasi yang ditetapkan",muet:"Minimum tertakluk syarat rasmi program",extra:"Ditawarkan dalam kelompok Kejuruteraan Kimia dan Tenaga; angka tidak dipaparkan tanpa sumber khusus 2026",source:"https://admission.utm.my/entry-requirements-ug-malaysian/"}
 ],
 marin:[
  {uni:"Universiti Teknologi Malaysia (UTM)",program:"Sarjana Muda Kejuruteraan Mekanikal (Seni Bina Kapal dan Kejuruteraan Luar Pantai) dengan Kepujian",pngk:null,spm:"Memenuhi syarat am serta syarat Matematik dan Fizik program",stpm:"Mathematics dan Physics serta kombinasi Sains yang ditetapkan",muet:"Minimum tertakluk syarat rasmi program",extra:"Nama rasmi program membezakan laluan ini daripada Sains Marin",source:"https://admission.utm.my/entry-requirements-ug-malaysian/"}
 ],
 telekomunikasi:[
  {uni:"Universiti Teknikal Malaysia Melaka (UTeM)",program:"Ijazah Sarjana Muda Teknologi Kejuruteraan Elektronik (Telekomunikasi) dengan Kepujian",pngk:2.00,spm:"Kepujian Bahasa Melayu dan lulus Sejarah; kepujian Matematik/Matematik Tambahan",stpm:"Minimum C dalam Mathematics (M/T) dan satu daripada Physics, Chemistry atau Biology",muet:"Band 2.0",extra:"Kod UC6523004 / BERT · 8 semester · syarat rasmi sesi 2026/2027",source:"https://www.utem.edu.my/en/downloads/kemasukan/242-sesi-20262027-lepasan-stpm-syarat-kemasukan-prasiswazah.html",spmRules:[{subject:"Bahasa Melayu",minimum:"C"},{subject:"Matematik / Matematik Tambahan",minimum:"C"}]}
 ]
};
export default function LaluanPage(){
 const [mode,setMode]=useState<"career"|"package">("career");
 const [selected,setSelected]=useState<CareerKey>("peguam");
 const [selectedPackage,setSelectedPackage]=useState<PackageKey>("p1");
 const [selectedRequirement,setSelectedRequirement]=useState(0);
 const [selectedEngineering,setSelectedEngineering]=useState<EngineeringProgramKey>("elektrik");
 const [selectedLaw,setSelectedLaw]=useState<LawProgramKey>("llb");
 const [selectedMath,setSelectedMath]=useState<MathProgramKey>("matematik");
 const [selectedScience,setSelectedScience]=useState<ScienceProgramKey>("fizik");
 const [selectedBusiness,setSelectedBusiness]=useState<BusinessProgramKey>("pengurusan");
 const [selectedHuman,setSelectedHuman]=useState<HumanProgramKey>("psikologi");
 const [selectedEducation,setSelectedEducation]=useState<EducationProgramKey>("biologi");
 const [selectedFinance,setSelectedFinance]=useState<FinanceProgramKey>("perakaunan");
 const [selectedSocial,setSelectedSocial]=useState<SocialHumanitiesProgramKey>("geografi");
 const [selectedMedia,setSelectedMedia]=useState<MediaProgramKey>("media");
 const [selectedPublicAffairs,setSelectedPublicAffairs]=useState<PublicAffairsProgramKey>("politik");
 const [selectedAgroFood,setSelectedAgroFood]=useState<AgroFoodProgramKey>("pertanian");
 const [selectedVetAnimal,setSelectedVetAnimal]=useState<VetAnimalProgramKey>("dvm");
 const [selectedEnvironment,setSelectedEnvironment]=useState<EnvironmentProgramKey>("pengurusan");
 const [selectedMarine,setSelectedMarine]=useState<MarineProgramKey>("marin");
 const [selectedSocialWork,setSelectedSocialWork]=useState<SocialWorkProgramKey>("kerja_sosial");
 const [selectedInfoScience,setSelectedInfoScience]=useState<InfoScienceProgramKey>("library");
 const [selectedCreative,setSelectedCreative]=useState<CreativeProgramKey>("seni_halus");
 const [selectedAlliedHealth,setSelectedAlliedHealth]=useState<AlliedHealthProgramKey>("bioperubatan");
 const [selectedSport,setSelectedSport]=useState<SportProgramKey>("sains_sukan");
 const [selectedIslamicStudies,setSelectedIslamicStudies]=useState<IslamicStudiesProgramKey>("syariah");
 const [spmGrades,setSpmGrades]=useState<Record<string,Grade|"">>({});
 const item=careers[selected]; const requirements=selected==="peguam"?lawComparisons[selectedLaw]:selected==="jurutera"?engineeringComparisons[selectedEngineering]:selected==="guru"?educationComparisons[selectedEducation]:selected==="akauntan"?financeComparisons[selectedFinance]:selected==="matematik"?mathComparisons[selectedMath]:selected==="sains"?scienceComparisons[selectedScience]:selected==="perniagaan"?businessComparisons[selectedBusiness]:selected==="psikologi"?humanComparisons[selectedHuman]:selected==="sosial"?socialHumanitiesComparisons[selectedSocial]:selected==="media"?mediaComparisons[selectedMedia]:selected==="pentadbiran"?publicAffairsComparisons[selectedPublicAffairs]:selected==="pertanian"?agroFoodComparisons[selectedAgroFood]:selected==="veterinar"?vetAnimalComparisons[selectedVetAnimal]:selected==="alam"?environmentComparisons[selectedEnvironment]:selected==="marin"?marineComparisons[selectedMarine]:selected==="kerjasosial"?socialWorkComparisons[selectedSocialWork]:selected==="maklumat"?infoScienceComparisons[selectedInfoScience]:selected==="kreatif"?creativeComparisons[selectedCreative]:selected==="kesihatanbersekutu"?alliedHealthComparisons[selectedAlliedHealth]:selected==="sukan"?sportComparisons[selectedSport]:selected==="islam"?islamicStudiesComparisons[selectedIslamicStudies]:comparisons[selected]; const packageItem=packages[selectedPackage];
 const numeric=requirements.filter(r=>r.pngk!==null) as (Requirement&{pngk:number})[];
 const low=numeric.length?numeric.reduce((a,b)=>a.pngk<=b.pngk?a:b):null;
 const high=numeric.length?numeric.reduce((a,b)=>a.pngk>=b.pngk?a:b):null;
 const checker=requirements[Math.min(selectedRequirement,requirements.length-1)];
 const checks=(checker.spmRules||[]).map(rule=>({rule,grade:spmGrades[rule.subject]||"",pass:spmGrades[rule.subject]?grades.indexOf(spmGrades[rule.subject] as Grade)<=grades.indexOf(rule.minimum):null}));
 return <main className="simple-page"><div className="simple-shell wide career-shell">
  <Link className="back-link" href="/"><ArrowLeft/> Kembali ke portal</Link>
  <header><BriefcaseBusiness/><small>LALUAN KERJAYA</small><h1>Dari sekolah ke kerjaya</h1><p>Terokai laluan berdasarkan kerjaya pilihan atau pakej mata pelajaran yang ditawarkan di KTESA.</p></header>
  <div className="path-mode" role="tablist" aria-label="Cara meneroka laluan kerjaya"><button role="tab" aria-selected={mode==="career"} className={mode==="career"?"active":""} onClick={()=>setMode("career")}><BriefcaseBusiness/> Ikut kerjaya</button><button role="tab" aria-selected={mode==="package"} className={mode==="package"?"active":""} onClick={()=>setMode("package")}><BookOpenCheck/> Ikut Pakej KTESA</button></div>
  {mode==="package"?<>
  <section className="career-picker package-picker"><label htmlFor="package">Pakej mata pelajaran saya</label><select id="package" value={selectedPackage} onChange={e=>setSelectedPackage(e.target.value as PackageKey)}>{Object.entries(packages).map(([key,p])=><option key={key} value={key}>{p.name} · {p.stream}</option>)}</select></section>
  <div className="package-profile"><div><small>PAKEJ PILIHAN</small><h2>{packageItem.name}</h2><p>{packageItem.stream}</p></div><div className="subject-chips">{packageItem.subjects.map(subject=><span key={subject}>{subject}</span>)}</div></div>
  <section className="package-paths"><div className="compare-heading"><div><small>CADANGAN LALUAN</small><h2>Bidang yang boleh diterokai</h2><p>Contoh program dan kerjaya yang sepadan dengan kombinasi subjek pakej ini.</p></div></div><div className="package-field-grid">{packageItem.fields.map((field,index)=><article key={field.name}><span>{String(index+1).padStart(2,"0")}</span><h3>{field.name}</h3><b>Contoh program</b><p>{field.courses}</p><b>Contoh kerjaya</b><p>{field.careers}</p></article>)}</div><div className="package-note"><CheckCircle2/><p>{packageItem.note}</p></div></section>
  <div className="career-warning"><b>Penting</b><p>Cadangan ini membantu pelajar meneroka pilihan, tetapi tidak bermaksud semua program layak secara automatik. Syarat SPM, gred STPM, PNGK, MUET, merit dan syarat khas universiti tetap perlu disemak melalui e-Panduan UPU.</p></div>
  </>:<>
  <section className="career-picker"><label htmlFor="career">Bidang yang saya mahu terokai</label><select id="career" value={selected} onChange={e=>{setSelected(e.target.value as CareerKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(careers).map(([key,c])=><option key={key} value={key}>{c.name}</option>)}</select></section>
  <div className="career-title"><span><BriefcaseBusiness/></span><div><small>LALUAN PILIHAN</small><h2>{item.name}</h2><p>{item.course}</p></div></div>
  <section className="engineering-explorer"><div className="compare-heading"><div><small>{careerBranches[selected].length} CABANG UNTUK DITEROKAI</small><h2>{item.name} bukan satu laluan sahaja</h2><p>Bandingkan perkara yang dipelajari, contoh kerjaya dan syarat program sebelum memilih.</p></div></div><div className="engineering-grid health-grid">{careerBranches[selected].map(branch=><article key={branch.name}><h3>{branch.name}</h3><b>Apa yang dipelajari</b><p>{branch.study}</p><b>Contoh kerjaya</b><p>{branch.careers}</p></article>)}</div></section>
  <div className="career-grid">
   <article><div className="career-card-head"><School/><div><small>SEMASA SPM</small><h3>Asas yang perlu diberi perhatian</h3></div></div><ul>{item.spm.map(x=><li key={x}><CheckCircle2/>{x}</li>)}</ul></article>
   <article><div className="career-card-head"><BookOpenCheck/><div><small>SEMASA STPM</small><h3>Subjek yang sesuai</h3></div></div><p className="stream-note">{item.stream}</p><ul>{item.stpm.map(x=><li key={x}><CheckCircle2/>{x}</li>)}</ul></article>
   <article><div className="career-card-head"><Target/><div><small>SASARAN KOMPETITIF</small><h3>Apa yang patut disasarkan?</h3></div></div><p className="career-target">{item.target}</p><Link href="/sasar">Tetapkan sasaran dalam SASAR <ExternalLink/></Link></article>
   <article className="official-card"><div className="career-card-head"><GraduationCap/><div><small>CONTOH SYARAT SEMASA</small><h3>Semak sebelum memohon</h3></div></div><p>{item.official}</p><a href={item.source} target="_blank" rel="noopener noreferrer">Buka sumber rasmi <ExternalLink/></a></article>
  </div>
  {selected==="jurutera"&&<section className="career-picker"><label htmlFor="engineering-program">Program kejuruteraan untuk dibandingkan</label><select id="engineering-program" value={selectedEngineering} onChange={e=>{setSelectedEngineering(e.target.value as EngineeringProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(engineeringProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="psikologi"&&<section className="career-picker"><label htmlFor="human-program">Subprogram untuk dibandingkan</label><select id="human-program" value={selectedHuman} onChange={e=>{setSelectedHuman(e.target.value as HumanProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(humanProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="perniagaan"&&<section className="career-picker"><label htmlFor="business-program">Subprogram Perniagaan untuk dibandingkan</label><select id="business-program" value={selectedBusiness} onChange={e=>{setSelectedBusiness(e.target.value as BusinessProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(businessProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="sains"&&<section className="career-picker"><label htmlFor="science-program">Subprogram Sains untuk dibandingkan</label><select id="science-program" value={selectedScience} onChange={e=>{setSelectedScience(e.target.value as ScienceProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(scienceProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="matematik"&&<section className="career-picker"><label htmlFor="math-program">Subprogram Matematik/Statistik/Aktuari untuk dibandingkan</label><select id="math-program" value={selectedMath} onChange={e=>{setSelectedMath(e.target.value as MathProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(mathProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="peguam"&&<section className="career-picker"><label htmlFor="law-program">Laluan undang-undang untuk dibandingkan</label><select id="law-program" value={selectedLaw} onChange={e=>{setSelectedLaw(e.target.value as LawProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(lawProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="guru"&&<section className="career-picker"><label htmlFor="education-program">Program pendidikan untuk dibandingkan</label><select id="education-program" value={selectedEducation} onChange={e=>{setSelectedEducation(e.target.value as EducationProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(educationProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="akauntan"&&<section className="career-picker"><label htmlFor="finance-program">Program Perakaunan, Kewangan & Ekonomi untuk dibandingkan</label><select id="finance-program" value={selectedFinance} onChange={e=>{setSelectedFinance(e.target.value as FinanceProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(financeProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="sosial"&&<section className="career-picker"><label htmlFor="social-program">Subprogram Sains Sosial & Kemanusiaan untuk dibandingkan</label><select id="social-program" value={selectedSocial} onChange={e=>{setSelectedSocial(e.target.value as SocialHumanitiesProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(socialHumanitiesProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="media"&&<section className="career-picker"><label htmlFor="media-program">Subprogram Media, Komunikasi & Industri Kreatif untuk dibandingkan</label><select id="media-program" value={selectedMedia} onChange={e=>{setSelectedMedia(e.target.value as MediaProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(mediaProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="pentadbiran"&&<section className="career-picker"><label htmlFor="public-affairs-program">Subprogram Pentadbiran Awam, Politik & Hubungan Antarabangsa untuk dibandingkan</label><select id="public-affairs-program" value={selectedPublicAffairs} onChange={e=>{setSelectedPublicAffairs(e.target.value as PublicAffairsProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(publicAffairsProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="pertanian"&&<section className="career-picker"><label htmlFor="agrofood-program">Subprogram Pertanian, Perhutanan & Sains Makanan untuk dibandingkan</label><select id="agrofood-program" value={selectedAgroFood} onChange={e=>{setSelectedAgroFood(e.target.value as AgroFoodProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(agroFoodProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="veterinar"&&<section className="career-picker"><label htmlFor="vetanimal-program">Subprogram Veterinar & Sains Haiwan untuk dibandingkan</label><select id="vetanimal-program" value={selectedVetAnimal} onChange={e=>{setSelectedVetAnimal(e.target.value as VetAnimalProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(vetAnimalProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="alam"&&<section className="career-picker"><label htmlFor="environment-program">Subprogram Alam Sekitar & Kelestarian untuk dibandingkan</label><select id="environment-program" value={selectedEnvironment} onChange={e=>{setSelectedEnvironment(e.target.value as EnvironmentProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(environmentProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="marin"&&<section className="career-picker"><label htmlFor="marine-program">Subprogram Sains Marin & Akuatik untuk dibandingkan</label><select id="marine-program" value={selectedMarine} onChange={e=>{setSelectedMarine(e.target.value as MarineProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(marineProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="kerjasosial"&&<section className="career-picker"><label htmlFor="socialwork-program">Subprogram Kerja Sosial & Pembangunan Komuniti untuk dibandingkan</label><select id="socialwork-program" value={selectedSocialWork} onChange={e=>{setSelectedSocialWork(e.target.value as SocialWorkProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(socialWorkProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="maklumat"&&<section className="career-picker"><label htmlFor="infoscience-program">Subprogram Maklumat, Perpustakaan & Pengurusan Rekod untuk dibandingkan</label><select id="infoscience-program" value={selectedInfoScience} onChange={e=>{setSelectedInfoScience(e.target.value as InfoScienceProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(infoScienceProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="kreatif"&&<section className="career-picker"><label htmlFor="creative-program">Subprogram Seni, Reka Bentuk & Kreatif untuk dibandingkan</label><select id="creative-program" value={selectedCreative} onChange={e=>{setSelectedCreative(e.target.value as CreativeProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(creativeProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="kesihatanbersekutu"&&<section className="career-picker"><label htmlFor="alliedhealth-program">Subprogram Kesihatan Bersekutu untuk dibandingkan</label><select id="alliedhealth-program" value={selectedAlliedHealth} onChange={e=>{setSelectedAlliedHealth(e.target.value as AlliedHealthProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(alliedHealthProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="sukan"&&<section className="career-picker"><label htmlFor="sport-program">Subprogram Sukan, Kecergasan & Kejurulatihan untuk dibandingkan</label><select id="sport-program" value={selectedSport} onChange={e=>{setSelectedSport(e.target.value as SportProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(sportProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  {selected==="islam"&&<section className="career-picker"><label htmlFor="islamicstudies-program">Subprogram Pengajian Islam untuk dibandingkan</label><select id="islamicstudies-program" value={selectedIslamicStudies} onChange={e=>{setSelectedIslamicStudies(e.target.value as IslamicStudiesProgramKey);setSelectedRequirement(0);setSpmGrades({})}}>{Object.entries(islamicStudiesProgramNames).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></section>}
  <section className="uni-compare">
   <div className="compare-heading"><div><small>SYARAT KHAS PROGRAM · SESI 2026/2027</small><h2>{selected==="jurutera"?`${engineeringProgramNames[selectedEngineering]} — universiti yang telah disahkan`:selected==="peguam"?`${lawProgramNames[selectedLaw]} — universiti yang telah disahkan`:selected==="guru"?`${educationProgramNames[selectedEducation]} — universiti yang telah disahkan`:selected==="akauntan"?`${financeProgramNames[selectedFinance]} — universiti yang telah disahkan`:selected==="matematik"?`${mathProgramNames[selectedMath]} — universiti yang telah disahkan`:selected==="sains"?`${scienceProgramNames[selectedScience]} — universiti yang telah disahkan`:selected==="perniagaan"?`${businessProgramNames[selectedBusiness]} — universiti yang telah disahkan`:selected==="psikologi"?`${humanProgramNames[selectedHuman]} — universiti yang telah disahkan`:selected==="sosial"?`${socialHumanitiesProgramNames[selectedSocial]} — universiti yang telah disahkan`:selected==="media"?`${mediaProgramNames[selectedMedia]} — universiti yang telah disahkan`:selected==="pentadbiran"?`${publicAffairsProgramNames[selectedPublicAffairs]} — universiti yang telah disahkan`:selected==="pertanian"?`${agroFoodProgramNames[selectedAgroFood]} — universiti yang telah disahkan`:selected==="veterinar"?`${vetAnimalProgramNames[selectedVetAnimal]} — universiti yang telah disahkan`:selected==="alam"?`${environmentProgramNames[selectedEnvironment]} — universiti yang telah disahkan`:selected==="marin"?`${marineProgramNames[selectedMarine]} — universiti yang telah disahkan`:selected==="kerjasosial"?`${socialWorkProgramNames[selectedSocialWork]} — universiti yang telah disahkan`:selected==="maklumat"?`${infoScienceProgramNames[selectedInfoScience]} — universiti yang telah disahkan`:selected==="kreatif"?`${creativeProgramNames[selectedCreative]} — universiti yang telah disahkan`:selected==="kesihatanbersekutu"?`${alliedHealthProgramNames[selectedAlliedHealth]} — universiti yang telah disahkan`:selected==="sukan"?`${sportProgramNames[selectedSport]} — universiti yang telah disahkan`:selected==="islam"?`${islamicStudiesProgramNames[selectedIslamicStudies]} — universiti yang telah disahkan`:"Universiti yang menawarkan program berkaitan"}</h2><p>{selected==="jurutera"?"Hanya rekod dengan syarat program yang dapat disahkan daripada halaman rasmi semasa dipaparkan. Universiti lain akan ditambah selepas dokumen programnya disahkan.":"Angka khusus dipaparkan apabila diterbitkan oleh universiti. Syarat khas program tetap wajib dipenuhi."}</p></div><a href="https://upu.mohe.gov.my/PEKELILING%20KEMASUKAN%20STPM_MATRIK_ASASI_STAM%20KE%20UNIVERSITI%20AWAM%20SESI%20AKADEMIK%202627.pdf" target="_blank" rel="noopener noreferrer">Pekeliling rasmi 2026/2027 <ExternalLink/></a></div>
   {numeric.length===1&&<div className="range-cards"><div><small>PNGK MINIMUM YANG DIREKODKAN</small><strong>{numeric[0].pngk.toFixed(2)}</strong><span>{numeric[0].uni}</span></div></div>}
   {numeric.length>1&&<div className="range-cards"><div><small>PNGK MINIMUM TERENDAH</small><strong>{low!.pngk.toFixed(2)}</strong><span>{low!.uni}</span></div><div><small>PNGK MINIMUM TERTINGGI</small><strong>{high!.pngk.toFixed(2)}</strong><span>{high!.uni}</span></div></div>}
   <div className="requirement-table-wrap"><table className="requirement-table"><thead><tr><th>Universiti & program</th><th>PNGK minimum rasmi</th><th>Merit rujukan UPU 2026</th><th>Keperluan SPM</th><th>Keperluan STPM</th><th>MUET</th><th>Lain-lain</th><th>Sumber</th></tr></thead><tbody>{requirements.map(r=><tr key={r.uni+r.program}><td><b>{r.uni}</b><span>{r.program}</span></td><td><strong>{r.pngk===null?"Tiada makluman rasmi":r.pngk.toFixed(2)}</strong><span>{r.pngk===null?"pada halaman program":"Syarat minimum"}</span></td><td>{r.merit?<strong>{r.merit.toFixed(2)}%</strong>:<span className="merit-pending">Tiada makluman rasmi</span>}</td><td>{r.spm}</td><td>{r.stpm}</td><td>{r.muet.startsWith("Semak")?"Tiada makluman rasmi":r.muet}</td><td>{r.extra}</td><td><a href={r.source} target="_blank" rel="noopener noreferrer" aria-label={`Sumber rasmi ${r.uni}`}><ExternalLink/> Rasmi</a></td></tr>)}</tbody></table></div>
  </section>
  <section className="eligibility-checker">
   <div className="compare-heading"><div><small>SEMAK KELAYAKAN SPM</small><h2>Ada syarat yang perlu diperbaiki?</h2><p>Bandingkan keputusan SPM dengan syarat khusus program yang telah direkodkan.</p></div></div>
   <label htmlFor="program-check">Program untuk disemak</label><select id="program-check" value={Math.min(selectedRequirement,requirements.length-1)} onChange={e=>{setSelectedRequirement(Number(e.target.value));setSpmGrades({})}}>{requirements.map((r,i)=><option value={i} key={r.uni+r.program}>{r.uni} · {r.program}</option>)}</select>
   {!checker.spmRules?.length?<div className="checker-empty"><AlertCircle/><p>Syarat gred subjek SPM bagi program ini belum direkodkan secara spesifik. Gunakan pautan sumber rasmi untuk semakan semasa.</p></div>:<div className="grade-check-grid">{checks.map(({rule,grade,pass})=><div className={`grade-check-row ${pass===true?"pass":pass===false?"fail":""}`} key={rule.subject}><div><b>{rule.subject}</b><span>Minimum {rule.minimum}</span></div><select aria-label={`Gred SPM ${rule.subject}`} value={grade} onChange={e=>setSpmGrades({...spmGrades,[rule.subject]:e.target.value as Grade})}><option value="">Pilih gred</option>{grades.map(g=><option value={g} key={g}>{g}</option>)}</select><div className="grade-result">{pass===true?<><CheckCircle2/> Memenuhi</>:pass===false?<><XCircle/> Perlu diperbaiki</>:"Belum diisi"}</div></div>)}</div>}
   {checks.some(c=>c.pass===false)&&<div className="repeat-advice"><AlertCircle/><div><b>Masih ada ruang untuk merancang</b><p>Pertimbangkan SPM Ulangan bagi subjek yang berkenaan jika ditawarkan pada tahun tersebut. Semak jadual dan syarat pendaftaran rasmi sebelum membuat keputusan.</p></div></div>}
  </section>
  <div className="career-warning"><b>Penting</b><p>“Sasaran kompetitif” ialah cadangan perancangan, bukan jaminan tawaran. Syarat wajib boleh berubah mengikut universiti, program dan sesi kemasukan. Buat semakan akhir melalui e-Panduan UPU.</p></div>
  </>}
 </div></main>
}
