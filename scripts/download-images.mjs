import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'assets', 'images', 'ig');
mkdirSync(OUT, { recursive: true });

// Image URLs from our scrape — fish photos and event shots
const images = [
  { name: 'tank-073.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/620503244_18118714834600599_6969521503380533280_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MjQ2MTg5ODQxNjk3OTI2ODQzMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=c4B89w0rHLsQ7kNvwFKVBFz&_nc_oc=Ado4UMPDVCpHFN4bzDaVREGtgfES23y44MaJyRcd1Vm-7Xhssf2cNYiovt87MpS8zgQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=eAqzPuXZl9_a9CEexDMROQ&_nc_ss=7a32e&oh=00_Af3feP1AelZnPqND2Jp7wWlPrQd1s6hEilu75HVcdzEI0g&oe=69D930D6' },
  { name: 'venue-setup.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/649249089_18096010534803516_300773434573642647_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MjQ2MTU1NjUwNzE1NzA3OTgzMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwNTJ4NTkyLnNkci5DMyJ9&_nc_ohc=zJk1Rr26ON8Q7kNvwGtSRdV&_nc_oc=Adrqg3mD5FB4MgpKiQRAjDtC4JSP4CIG2EvvIJgLn9OEBww8O3FCN4rAY-MLEyqtC5w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=QmR5wvtehGhL-5uHOQNPjw&_nc_ss=7a32e&oh=00_Af3i8h9QYCpmb6wkObBpwDUvcjwo5zh0hlAkZibIVhplgA&oe=69D92676' },
  { name: 'cencu-ops.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/628479569_18432824848114363_4390794329330391645_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MjAzNDg2ODM0NDYzMjY1MDY0MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=WEs9juMQA4wQ7kNvwE53nO8&_nc_oc=Adq4L6dHjFEaYCCHK_sXHgfiuB52gtgt83HrqPGNaDJAe_OYb4bcCqfBDV07TcXUYvk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=-zW7APAgvZuBjN2XDHiVuA&_nc_ss=7a32e&oh=00_Af3VhyLGCcNCiqT3vaDnBDWRITDG1QU1P0sH3b_CA-FqaQ&oe=69D90C89' },
  { name: 'flowerhorn-strong.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/624845988_18335327455243939_2507398478128105053_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MjAyODMzNDQ0Nzg1Mzg2ODA0Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Lb7qEs5wOY8Q7kNvwF1fmuZ&_nc_oc=AdqUV44DAFU7kjHerc4ZbQ1WAcdEHhmI4XVgB0R2Gb4PEtGhl5D7DzTK1HLSq3luKrg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=976B7EXlqppIDDeZ1Ag8bg&_nc_ss=7a32e&oh=00_Af1S4qVCuDnJoA8bqkr7IA_F4CXovBoTNqlGlWZ54iJ2Fw&oe=69D91E0C' },
  { name: 'indo-kamfa.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/639921213_18575608141020835_7378816483406043556_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MjAyNTk2NTI3OTQ4NTgzMTkwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=FHNa7qSt1xQQ7kNvwGuWzcB&_nc_oc=Adq_2N3B7EaAEa_2aQAAisuB5LffNsfvbZ7asC5V_Kya_W-gwjLkiKCYS1qXsLmxgIE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=8z0zi6t-uQeDcnhW7VS1Bg&_nc_ss=7a32e&oh=00_Af3tbBNTgB0M3QL_l-qkpuW4Pia_15UgVvCkVq4mMf8GAw&oe=69D92A8D' },
  { name: 'ccc-winner.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/655218776_18414269482121903_3567890553103939164_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MjAyNTQ3OTg0NzQxNzMxMjg5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MXg2NDEuc2RyLkMzIn0%3D&_nc_ohc=a70ID5vgHn4Q7kNvwGCYZ3W&_nc_oc=AdpLY53auN3alNp79BFyrcG2hRl_l8ewCsD7CLysLzElq0EphBZYSMY0J7iDmwTZSRQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=MUv5aOQmd5Y3pnXCdWILqg&_nc_ss=7a32e&oh=00_Af0x9tnbTSWb2aU8AzUcHzvZWFo0IumYeEvUMgdMuUt8bA&oe=69D93D60' },
  { name: 'klasik-top10.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/655076883_18312546211260005_6265845214710905316_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MjAyMTM3NzgyNzA5NzgwODU3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjQ4MHg0ODAuc2RyLkMzIn0%3D&_nc_ohc=J0Yy7H4ezV0Q7kNvwF69VMr&_nc_oc=Adow1IxmWdQmLJxDMjblhRASD_lYkP85nYw_hd_LqcayXAQ0dObe4laXzMVLf1El_PA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=AK8iA85H9fEqcs2eAwJUYQ&_nc_ss=7a32e&oh=00_Af3K4CtFj1fnnTr82hDNparej0fleWFBe-plqgRERPy54w&oe=69D923DD' },
  { name: 'golden-base.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/657312789_18332864329223469_3889976409727563051_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MjAxNzE3MzQ4MTY0MDY1NjUwOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjQ4MHg0ODAuc2RyLkMzIn0%3D&_nc_ohc=PRbzubTCjPMQ7kNvwHGErnX&_nc_oc=AdoUzBUU6758R-cyRH1S9MOe7-z63o7Qg-epwsozmKVKx52LoUfywv9Sqj7niksK8Xw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=4JTS_2Sc8zKn7EljSSRAOA&_nc_ss=7a32e&oh=00_Af2uh-xfCshTl36mJ9P1mrImIcthsSDMpdL-f1jSHqeMEQ&oe=69D93BB2' },
  { name: 'bonsai-ilc2.jpg', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.82787-15/655945921_18383369911095740_3607876565429719320_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MjAxNjQ3ODQ4OTMxODA5NzU5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjQ4MHg0ODAuc2RyLkMzIn0%3D&_nc_ohc=DxBV8V_-h0oQ7kNvwHry-0p&_nc_oc=Adom48tjoM6lokAOCjLGziXp4rNJgvoemaDTgg2pBDCz7U7200HjJx7VOJ7U-vSpUO4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=coKm2wPXAlt4IeU82Q0COA&_nc_ss=7a32e&oh=00_Af1NEM0dOhSG5bmM03ud2KbqOV4CLh1e03rosMebepXYLw&oe=69D9168A' },
  { name: 'ilc-registration.webp', url: 'https://instagram.fcgk32-1.fna.fbcdn.net/v/t51.75761-15/482760312_17904849561102860_6429874350957827686_n.webp?_nc_cat=100&ig_cache_key=MzU4MDY3MzUxMTk2ODMzMjcwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=rmTj8bqjivkQ7kNvwG6oaSs&_nc_oc=AdqyqTIl82xlt32S0RWa98Dhxfz0cnpOgyJ95MHI59Y6yMrAW1mqOF0H21tXnTMhCqs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgk32-1.fna&_nc_gid=e2Y8mvB6CCoWF5unng2tvQ&_nc_ss=7a32e&oh=00_Af0RvRuS3P9vrURJ24EGDmRKrHyBApoX4qGcXBDoI5Qsug&oe=69D91BE1' },
];

for (const img of images) {
  try {
    const res = await fetch(img.url);
    if (!res.ok) {
      console.error(`FAILED ${img.name}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(OUT, img.name), buf);
    console.log(`OK ${img.name} (${(buf.length / 1024).toFixed(0)} kB)`);
  } catch (err) {
    console.error(`FAILED ${img.name}: ${err.message}`);
  }
}

console.log('\nDone.');
