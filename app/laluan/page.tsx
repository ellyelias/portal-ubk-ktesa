"use client";
import Link from "next/link";
import { AlertCircle, ArrowLeft, BookOpenCheck, BriefcaseBusiness, CheckCircle2, ExternalLink, GraduationCap, School, Target, XCircle } from "lucide-react";
import { useState } from "react";

const careers = {
  peguam: {
    name:"Peguam", course:"Ijazah Sarjana Muda Undang-undang (LLB)", stream:"Terbuka kepada aliran Sains atau Sastera, tertakluk kepada syarat universiti.",
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
    name:"Akauntan", course:"Ijazah Sarjana Muda Perakaunan / Kewangan", stream:"Aliran Sastera atau Sains, bergantung pada program.",
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
    name:"Guru", course:"Ijazah Sarjana Muda Pendidikan", stream:"Aliran bergantung pada bidang pengkhususan.",
    spm:["Bahasa Melayu dan Sejarah perlu memenuhi syarat am.","Subjek yang hendak diajar perlu mempunyai keputusan yang kuat."],
    stpm:["Pilih subjek yang sepadan dengan opsyen pengajaran","Pengajian Am","Kukuhkan Bahasa Inggeris dan MUET"],
    target:"Sasarkan B+ atau A dalam subjek pengkhususan serta PNGK sekurang-kurangnya 3.00.",
    official:"Kebanyakan program pendidikan mempunyai syarat khas dan sesetengahnya memerlukan ujian atau temu duga.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  psikologi: {
    name:"Ahli Psikologi", course:"Ijazah Sarjana Muda Psikologi", stream:"Boleh terbuka kepada aliran Sains atau Sastera mengikut universiti.",
    spm:["Bahasa Inggeris penting kerana banyak bahan rujukan digunakan dalam bahasa ini.","Matematik dan subjek Sains membantu untuk statistik serta asas biologi tingkah laku."],
    stpm:["Biology jika mengambil aliran Sains","Mathematics","Bahasa Melayu, Sejarah atau subjek Sains Sosial yang berkaitan"],
    target:"Sasarkan PNGK 3.30 ke atas dan MUET sekurang-kurangnya Band 4 untuk pilihan lebih luas.",
    official:"Semak sama ada program yang dipilih ialah Psikologi, Kaunseling atau Psikologi Klinikal kerana laluan kerjayanya berbeza.",
    source:"https://online.mohe.gov.my/epanduan/"
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
    name:"Sains & Penyelidikan", course:"Fizik / Kimia / Biologi / Matematik / Statistik / Sains Bahan", stream:"Laluan Sains mengikut bidang pengkhususan.",
    spm:["Matematik dan subjek Sains berkaitan perlu diberi perhatian.","Matematik Tambahan penting untuk Fizik, Matematik dan Statistik."],
    stpm:["Physics, Chemistry atau Biology mengikut program","Mathematics","Pengajian Am"],
    target:"Sasarkan PNGK 3.00 ke atas dan keputusan kukuh dalam subjek pengkhususan.",
    official:"Program sains tulen mempunyai kombinasi subjek khas yang berbeza. Semak cabang dan universiti sebelum memohon.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  perniagaan: {
    name:"Perniagaan, Ekonomi & Kewangan", course:"Ekonomi / Kewangan / Perniagaan / Pemasaran / Sumber Manusia", stream:"Terbuka kepada aliran Sains atau Sains Sosial mengikut program.",
    spm:["Matematik sering menjadi syarat khusus untuk Ekonomi, Kewangan dan Analitik.","Bahasa Inggeris membantu untuk pengajian dan komunikasi profesional."],
    stpm:["Ekonomi","Pengajian Perniagaan","Mathematics atau subjek yang diterima program"],
    target:"Sasarkan PNGK 3.00 ke atas; program popular dan analitik biasanya lebih kompetitif.",
    official:"Bezakan syarat Ekonomi, Kewangan, Perbankan, Pemasaran dan Pengurusan kerana setiap program tidak sama.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  kreatif: {
    name:"Seni, Reka Bentuk & Media", course:"Reka Bentuk / Seni Halus / Animasi / Multimedia / Komunikasi / Media", stream:"Terbuka kepada Sains atau Sains Sosial; portfolio mungkin diperlukan.",
    spm:["Bahasa Melayu dan Sejarah mesti memenuhi syarat am.","Seni Visual, Bahasa Inggeris dan kemahiran digital membantu mengikut program."],
    stpm:["Seni Visual atau Bahasa Melayu","Sejarah atau subjek Sains Sosial","MUET dan portfolio untuk program tertentu"],
    target:"Kukuhkan keputusan akademik dan bina portfolio asli yang menunjukkan proses serta kemahiran.",
    official:"Program seni, seni bina, reka bentuk dan media tertentu memerlukan ujian, portfolio atau temu duga.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  alam: {
    name:"Alam Sekitar, Pertanian & Makanan", course:"Sains Alam Sekitar / Pertanian / Perhutanan / Sains Makanan / Bioteknologi", stream:"Laluan Sains; sesetengah program menerima kombinasi Sains yang lebih luas.",
    spm:["Biologi, Kimia, Matematik dan subjek Sains berkaitan lazimnya diperiksa.","Geografi membantu untuk bidang alam sekitar dan perancangan."],
    stpm:["Biology atau Chemistry","Mathematics atau subjek Sains diterima","Pengajian Am"],
    target:"Sasarkan PNGK 3.00 ke atas dan keputusan baik dalam Biology atau Chemistry.",
    official:"Semak sama ada program berfokus sains, teknologi, pengurusan sumber atau pengeluaran makanan.",
    source:"https://online.mohe.gov.my/epanduan/"
  },
  pentadbiran: {
    name:"Kerajaan, Antarabangsa & Masyarakat", course:"Pentadbiran Awam / Sains Politik / Hubungan Antarabangsa / Pembangunan / Sejarah", stream:"Terbuka kepada aliran Sains atau Sains Sosial.",
    spm:["Bahasa Melayu, Bahasa Inggeris dan Sejarah perlu diberi perhatian.","Kemahiran menulis, berhujah dan memahami isu semasa sangat membantu."],
    stpm:["Pengajian Am","Sejarah, Ekonomi atau Bahasa Melayu","Subjek lain yang diterima program"],
    target:"Sasarkan PNGK 3.00 ke atas dan MUET yang baik untuk pilihan lebih luas.",
    official:"Nama program mungkin berbeza antara universiti walaupun membawa kepada bidang kerja yang hampir sama.",
    source:"https://online.mohe.gov.my/epanduan/"
  }
} as const;

type CareerKey=keyof typeof careers;
type PackageKey="p1"|"p2"|"p3"|"p4"|"p5"|"p6"|"p7"|"p8";
type PackageInfo={name:string;stream:string;subjects:string[];fields:{name:string;courses:string;careers:string}[];note:string};
const packages:Record<PackageKey,PackageInfo>={
 p1:{name:"Pakej 1",stream:"Aliran Sains",subjects:["Pengajian Am","Physics","Chemistry","Mathematics","MUET"],fields:[
  {name:"Kejuruteraan & Teknologi",courses:"Kejuruteraan Elektrik, Mekanikal, Awam, Kimia atau Mekatronik",careers:"Jurutera, pegawai teknikal, penyelidik"},
  {name:"Komputer & Data",courses:"Sains Komputer, Teknologi Maklumat, Kejuruteraan Perisian, Sains Data",careers:"Pembangun perisian, penganalisis data, keselamatan siber"},
  {name:"Sains Fizikal",courses:"Fizik, Kimia, Sains Bahan, Matematik atau Statistik",careers:"Pegawai sains, ahli kimia, ahli statistik, penyelidik"}
 ],note:"Pakej ini paling sesuai untuk bidang berasaskan Physics dan Mathematics. Program kesihatan yang mewajibkan Biology STPM perlu disemak dengan teliti."},
 p2:{name:"Pakej 2",stream:"Aliran Sains",subjects:["Pengajian Am","Biology","Chemistry","Mathematics","MUET"],fields:[
  {name:"Kesihatan & Klinikal",courses:"Perubatan, Farmasi, Pergigian atau Sains Kesihatan",careers:"Doktor, pegawai farmasi, pegawai sains kesihatan"},
  {name:"Biologi Gunaan",courses:"Bioteknologi, Bioperubatan, Mikrobiologi, Sains Makanan",careers:"Pegawai penyelidik, ahli mikrobiologi, pegawai makmal"},
  {name:"Alam Sekitar & Pertanian",courses:"Sains Alam Sekitar, Sains Pertanian, Perhutanan atau Pemakanan",careers:"Pegawai alam sekitar, pegawai pertanian, penyelidik"}
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
  {name:"Aktuari",study:"Kebarangkalian, statistik, risiko dan pemodelan kewangan",careers:"Aktuari, penganalisis risiko, penganalisis insurans"},
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
  {name:"Matematik & Statistik",study:"Pemodelan, kebarangkalian, pengoptimuman dan analisis",careers:"Ahli statistik, penganalisis kuantitatif, saintis data"},
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
  {name:"Reka Bentuk Grafik",study:"Tipografi, identiti visual, susun atur dan komunikasi",careers:"Pereka grafik, pereka jenama, pengarah seni"},
  {name:"Animasi & Permainan",study:"Animasi, 3D, naratif, reka bentuk permainan dan produksi",careers:"Animator, artis 3D, pereka permainan"},
  {name:"Multimedia Kreatif",study:"Video, audio, interaktif dan produksi digital",careers:"Penerbit multimedia, editor video, pereka kandungan"},
  {name:"Komunikasi & Kewartawanan",study:"Media, penulisan, penyiaran dan komunikasi awam",careers:"Wartawan, penerbit, pegawai komunikasi"},
  {name:"Reka Bentuk UX/UI",study:"Penyelidikan pengguna, prototaip dan produk digital",careers:"Pereka UX/UI, pereka produk, penyelidik UX"},
  {name:"Seni Bina & Reka Dalaman",study:"Ruang, struktur, visualisasi dan alam bina",careers:"Arkitek selepas kelayakan profesional, pereka dalaman"},
  {name:"Teknologi Kreatif & AI",study:"AI generatif, pengkomputeran kreatif, produksi dan etika",careers:"Teknolog kreatif, pereka interaktif, pakar aliran kerja kreatif AI"},
  {name:"Seni Halus & Warisan",study:"Studio seni, sejarah seni, kuratorial dan pemuliharaan",careers:"Artis, kurator, pegawai galeri atau warisan"}
 ],
 alam:[
  {name:"Sains Alam Sekitar",study:"Ekologi, pencemaran, pemantauan dan dasar",careers:"Pegawai alam sekitar, perunding, pegawai pematuhan"},
  {name:"Pertanian Pintar",study:"Tanaman, data, sensor, automasi dan pengurusan ladang",careers:"Pegawai pertanian, pakar agroteknologi, pengurus ladang"},
  {name:"Sains Makanan",study:"Kimia makanan, pemprosesan, keselamatan dan kualiti",careers:"Pegawai teknologi makanan, pegawai kualiti, penyelidik"},
  {name:"Bioteknologi",study:"Molekul, mikrob, genetik dan aplikasi industri",careers:"Pegawai bioteknologi, penyelidik, pegawai makmal"},
  {name:"Perhutanan",study:"Hutan, biodiversiti, konservasi dan sumber",careers:"Pegawai perhutanan, pegawai konservasi, penyelidik"},
  {name:"Sains Marin & Akuakultur",study:"Ekosistem marin, sumber perikanan dan penternakan akuatik",careers:"Pegawai perikanan, ahli biologi marin, pegawai akuakultur"},
  {name:"Kelestarian & Iklim",study:"Karbon, risiko iklim, ESG dan peralihan tenaga",careers:"Penganalisis kelestarian, pegawai ESG, perunding iklim"},
  {name:"Teknologi Hijau",study:"Tenaga bersih, sumber, reka bentuk lestari dan inovasi",careers:"Pegawai teknologi hijau, penganalisis tenaga, penyelidik"}
 ],
 pentadbiran:[
  {name:"Pentadbiran Awam",study:"Dasar, organisasi kerajaan, kewangan awam dan tadbir urus",careers:"Pegawai tadbir, pegawai kerajaan, penganalisis dasar"},
  {name:"Sains Politik",study:"Institusi, politik perbandingan, pilihan raya dan dasar",careers:"Penyelidik politik, penganalisis dasar, pegawai program"},
  {name:"Hubungan Antarabangsa",study:"Diplomasi, keselamatan, ekonomi politik dan organisasi global",careers:"Pegawai diplomatik, pegawai antarabangsa, penganalisis geopolitik"},
  {name:"Pembangunan Antarabangsa",study:"Kemiskinan, komuniti, projek dan penilaian impak",careers:"Pegawai pembangunan, pengurus program, penyelidik"},
  {name:"Sejarah & Warisan",study:"Masyarakat, sumber sejarah, muzium dan pemuliharaan",careers:"Pegawai arkib, kurator, penyelidik sejarah"},
  {name:"Geografi & GIS",study:"Ruang, bandar, penduduk, pemetaan dan data geospatial",careers:"Penganalisis GIS, perancang, pegawai geospatial"},
  {name:"Dasar Teknologi & AI",study:"Tadbir urus data, etika AI, inovasi dan regulasi",careers:"Penganalisis dasar teknologi, pegawai tadbir urus AI"},
  {name:"Komunikasi Strategik",study:"Media, pihak berkepentingan, krisis dan komunikasi awam",careers:"Pegawai komunikasi korporat, pegawai perhubungan awam"}
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
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Seni, Reka Bentuk, Komunikasi dan Media",pngk:null,spm:"Syarat mengikut program",stpm:"Syarat khas program",muet:"Tiada makluman rasmi",extra:"Portfolio/ujian/temu duga bagi program tertentu",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Pendidikan Sultan Idris (UPSI)",program:"Seni, Reka Bentuk, Multimedia dan Pendidikan Seni",pngk:null,spm:"Syarat mengikut bidang",stpm:"Seni Visual/subjek berkaitan bagi program tertentu",muet:"Tiada makluman rasmi",extra:"MEdSI, ujian atau temu duga jika ditetapkan",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Malaysia Sarawak (UNIMAS)",program:"Seni Gunaan dan Kreatif",pngk:null,spm:"Syarat am dan khas",stpm:"Subjek diterima mengikut program",muet:"Tiada makluman rasmi",extra:"Portfolio/temu duga mungkin diperlukan",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Sains Malaysia (USM)",program:"Seni, Reka Bentuk dan Komunikasi",pngk:null,spm:"Syarat khas program",stpm:"Kombinasi subjek diterima",muet:"Tiada makluman rasmi",extra:"Rujuk POHON dan e-Panduan",source:"https://pohon.usm.my/"}
 ],
 alam:[
  {uni:"Universiti Putra Malaysia (UPM)",program:"Pertanian, Makanan, Alam Sekitar dan Perhutanan",pngk:null,spm:"Sains dan Matematik mengikut program",stpm:"Biology/Chemistry/Mathematics mengikut program",muet:"Tiada makluman rasmi",extra:"Bandingkan setiap program dalam buku syarat",source:"https://akademik.upm.edu.my/upload/dokumen/20260413164550BUKU_SYARAT_KEMASUKAN_BACELOR_2026.pdf"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sains Sekitaran dan bidang berkaitan",pngk:null,spm:"Syarat Sains program",stpm:"Kombinasi subjek ditetapkan",muet:"Tiada makluman rasmi",extra:"Rujuk kod program dalam e-Panduan",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Malaysia Sabah (UMS)",program:"Sains Marin, Perhutanan, Makanan dan Sumber",pngk:null,spm:"Sains/Matematik mengikut program",stpm:"Subjek Sains berkaitan",muet:"Tiada makluman rasmi",extra:"Program sebenar berbeza mengikut fakulti",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Malaysia Terengganu (UMT)",program:"Sains Marin, Perikanan, Makanan dan Alam Sekitar",pngk:null,spm:"Sains dan Matematik mengikut program",stpm:"Kombinasi subjek Sains ditetapkan",muet:"Tiada makluman rasmi",extra:"Rujuk syarat khas setiap program",source:"https://online.mohe.gov.my/epanduan/"}
 ],
 pentadbiran:[
  {uni:"Universiti Malaya (UM)",program:"Pentadbiran, Hubungan Antarabangsa dan Sains Sosial",pngk:null,spm:"Bahasa dan syarat program",stpm:"Subjek diterima mengikut program",muet:"Tiada makluman rasmi",extra:"Program berada di fakulti yang berbeza",source:"https://study.um.edu.my/"},
  {uni:"Universiti Kebangsaan Malaysia (UKM)",program:"Sains Politik, Sejarah dan Sains Sosial",pngk:null,spm:"Syarat am dan khas",stpm:"Kombinasi subjek diterima",muet:"Tiada makluman rasmi",extra:"Semak kod dan nama program",source:"https://www.ukm.my/portal/undergraduate-programmes/"},
  {uni:"Universiti Utara Malaysia (UUM)",program:"Pengurusan Awam dan Hal Ehwal Antarabangsa",pngk:null,spm:"Bahasa/Matematik mengikut program",stpm:"Syarat khas program",muet:"Tiada makluman rasmi",extra:"Bandingkan program pentadbiran dan antarabangsa",source:"https://www.uum.edu.my/admissions/application-guidelines/undergraduate-local"},
  {uni:"Universiti Teknologi MARA (UiTM)",program:"Pentadbiran, Polisi dan Komunikasi",pngk:null,spm:"Syarat khas program",stpm:"Kombinasi subjek diterima",muet:"Tiada makluman rasmi",extra:"Tertakluk syarat kelayakan UiTM",source:"https://online.mohe.gov.my/epanduan/"},
  {uni:"Universiti Malaysia Sabah (UMS)",program:"Hubungan Antarabangsa dan Sains Sosial",pngk:null,spm:"Syarat am dan khas",stpm:"Subjek diterima mengikut program",muet:"Tiada makluman rasmi",extra:"Tiada makluman rasmi",source:"https://online.mohe.gov.my/epanduan/"}
 ]
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
 const [spmGrades,setSpmGrades]=useState<Record<string,Grade|"">>({});
 const item=careers[selected]; const requirements=selected==="jurutera"?engineeringComparisons[selectedEngineering]:comparisons[selected]; const packageItem=packages[selectedPackage];
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
  <section className="uni-compare">
   <div className="compare-heading"><div><small>SYARAT KHAS PROGRAM · SESI 2026/2027</small><h2>{selected==="jurutera"?`${engineeringProgramNames[selectedEngineering]} — universiti yang telah disahkan`:"Universiti yang menawarkan program berkaitan"}</h2><p>{selected==="jurutera"?"Hanya rekod dengan syarat program yang dapat disahkan daripada halaman rasmi semasa dipaparkan. Universiti lain akan ditambah selepas dokumen programnya disahkan.":"Angka khusus dipaparkan apabila diterbitkan oleh universiti. Syarat khas program tetap wajib dipenuhi."}</p></div><a href="https://upu.mohe.gov.my/PEKELILING%20KEMASUKAN%20STPM_MATRIK_ASASI_STAM%20KE%20UNIVERSITI%20AWAM%20SESI%20AKADEMIK%202627.pdf" target="_blank" rel="noopener noreferrer">Pekeliling rasmi 2026/2027 <ExternalLink/></a></div>
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
