// SEMUA isi personal ada di file ini. Ganti teks draft dengan kata-katamu sendiri.
window.SITE = {
  name: "Novarizka Putri L",     // nama di amplop
  from: "SaqiAlfarq",         // dipakai sebagai tanda tangan default

  settings: {
    unlockAt: "2026-11-25T00:20:00+07:00", // +07:00 WIB, +08:00 WITA, +09:00 WIT
    previewKey: "",                         // kata rahasia untuk tes di situs live: link/?preview=KATA (kosongkan sebelum hari H)
    music: "assets/audio/bgm.mp3",
    photoDir: "assets/images/memories/"
  },

  lock: { title: "Sebentar lagi.", text: "Dunia kecil ini baru terbuka tepat di hari ulang tahunmu.", hand: "Sampai ketemu, 25 November." },

  welcome: { title: "A Little World for You", tagline: "Dari jauh, tapi untukmu.", hint: "Ketuk amplopnya" },

  birthday: {
    title: "Selamat ulang tahun, Kak Novarizka.",
    ask: "Sebelum lanjut, tiup lilinnya dulu ya. Jangan lupa make a wish.",
    done: "Semoga tahun ke-19 ini baik sama kamu. Ada beberapa hal kecil yang ingin kutunjukkan.",
    button: "Tiup lilin"
  },

  // photo = nama file di assets/images/memories/ (kosongkan jika belum ada)
  gallery: {
    title: "Kenangan kecil",
    hint: "Geser, lalu ketuk foto untuk membaca pesannya",
    items: [
      { photo: "roblox1.png", caption: "Awal-Awal kita kenal", date: "9 Agustus 2026", note: "sebenernya entah kenapa aku nyaman banget main sama kamu waktu awal-awal." },
      { photo: "si imup.jpeg", caption: "Haii My sweet Cookie", date: "20 September 2026", note: "kamuu imupp bangett aslii dahh." },
      { photo: "PELUK.png", caption: "first Time Photobooth", date: "16 Oktober 2026", note: "One Day, Semoga kita bisa langsung Foto Bareng." },
      { photo: "TOGETHER.jpeg", caption: "always together", date: "6 Oktober 2026", note: "May we always be together.." }
    ]
  },

  letter: {
    greet: "Untuk Novarizka,",
    body: [
      "Happy birthday, cantikk! 🤍🎂", 
      
      "Hari ini adalah hari spesial kamu, hari di mana seseorang seistimewa kamu bertambah usia. Aku harap di hari bahagia ini kamu bisa merasakan betapa berharganya diri kamu, bukan cuma buat orang-orang di sekitarmu, tapi juga buat aku.",  
      
      "Aku mau bilang terima kasih karena sudah hadir di hidup aku. Terima kasih karena selama ini selalu mau ada untuk aku, mau berbagi cerita, meluangkan waktu, dan menjadi salah satu bagian menyenangkan dalam hari-hari aku. Mungkin kelihatannya sederhana, tapi kehadiran kamu punya arti tersendiri buat aku.",

      "Kamu itu orangnya baik, cantik, imut, lucu, gemesin, pintar, aktif, dan punya banyak banget kelebihan. Bahkan, rasanya nggak akan cukup kalau harus aku sebutin satu per satu. Selalu ada hal dari diri kamu yang bikin aku kagum dan semakin senang mengenal kamu. Walaupun, yaaa, kamu juga orangnya cengeng dan penakut, hihiii. Tapi justru itu juga bagian dari diri kamu yang bikin kamu semakin menggemaskan. Jadi, jangan pernah merasa kurang atau membandingkan diri kamu dengan siapa pun, ya. Kamu punya keistimewaan dengan caramu sendiri.",

      "Di umur kamu yang baru ini, aku berdoa semoga semua hal baik selalu menyertai langkah kamu. Semoga apa yang sedang kamu usahakan bisa tercapai, apa yang sedang kamu impikan perlahan menjadi kenyataan, dan segala sesuatu yang selama ini kamu semogakan bisa menemukan jalannya. Kalau suatu hari keadaan nggak berjalan sesuai keinginan kamu, semoga kamu tetap punya cukup kekuatan untuk melewatinya.",

      "Aku juga berharap kamu selalu dikelilingi orang-orang baik, selalu diberi kesehatan, dimudahkan segala urusannya, dilancarkan rezekinya, dan tentunya selalu punya alasan untuk tersenyum. Jangan terlalu keras sama diri sendiri, jangan lupa istirahat, dan jangan terlalu sering menyimpan sedih sendirian, okay?",

      "Aku mungkin nggak selalu bisa ada di samping kamu secara langsung, apalagi dengan jarak yang sekarang memisahkan kita. Tapi aku harap kamu tahu kalau ada seseorang di sini yang selalu mendoakan hal-hal baik untuk kamu. Aku ingin melihat kamu tumbuh, berkembang, mengejar apa yang kamu inginkan, dan menjadi versi terbaik dari diri kamu sendiri.",

      "Once again, happy birthday, my pretty girl! Semoga hari ini dan hari-hari setelahnya selalu punya banyak kebahagiaan untuk kamu. Tetap jadi kamu yang aku kenal, yaa. Jangan kehilangan senyum, keceriaan, dan segala hal kecil yang membuat kamu menjadi diri kamu sendiri.",

      "Be happy always, cantikk. You deserve all the beautiful things in this world.",

      "I love you, more than words can explain. ❤️",
      "Jarak membuat kita jarang bertemu, tapi justru dari situ aku sadar betapa aku menghargai tiap obrolan, tiap tawa, dan tiap hal kecil yang kamu bagi.",
      "Di hari ulang tahunmu, aku cuma mau kamu tahu: kamu berarti, dan aku senang kamu ada."
    ],
    sign: "Dari jauh, SaqiAlfarq"
  },

  // [teks, sudah tercentang?]
  bucket: {
    title: "Kapan-kapan, kita…",
    placeholder: "Tambah impian kita",
    items: [
     ["Jalan-jalan tanpa tujuan", false],
      ["Jajan sepuasnya tapi kamu yang traktir hihii", false],
      ["Nonton film pilihanmu", false],
      ["Pelukan sampe warga memisahkan", false]
  ]
  },
  things: {
    title: "Hal-hal kecil",
    items: ["Caramu bercerita sampai ingin selalu ditemani.", "Tawamu yang bikin aku senang.", "Caramu peduli sama hal-hal kecil.", "Kamu yang selalu ada walau jauh.", "Kamu yang selalu nurunin ego demi aku.", "Mengirim pesan singkat di sela kesibukan kamuu."]
  },

  // Foto tampil satu per satu; baca semua "line" berurutan sebagai satu kalimat.
  finale: {
    moments: [
      { photo: "foto21.jpeg", line: "Dari obrolan pertama yang sederhana," },
      { photo: "roblox2.png", line: "sampai hal-hal kecil yang jadi kebiasaan," },
      { photo: "foto.jpeg", line: "kamu pelan-pelan jadi bagian dari hari-hariku." }
    ],
    title: "Selamat ulang tahun, My Sweety Cookie.",
    body: ["Terima kasih sudah ada, dari jauh sekalipun."],
    sign: "Dari jauh, SaqiAlfarq",
    replay: "Putar ulang"
  }
};
