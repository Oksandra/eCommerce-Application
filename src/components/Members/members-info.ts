import fotoOksana from '../../assets/images/oksana-photo.jpg';

export interface IMemberInfo {
  name: string;
  role: string;
  bio: string;
  photo: string;
  gh: string;
  contr: string;
}

export const MEMBERS: IMemberInfo[] = [
  {
    name: 'Oksana Golovina',
    role: 'Team Lead',
    bio: 'I started my journey in IT from RSSchool JS/Front-end/stage#0 last summer. All this time I have been actively improving my knowledge and skills. In this project, I coordinated the work on the project as a whole. Implemented routing for all pages of the application, pagination, a product page with its detailed description and modal windows. Uploaded all products to commercetools. Participated in the implementation of the catalog page and shopping cart.',
    photo: fotoOksana,
    gh: 'https://github.com/Oksandra',
    contr:
      '👨‍💼🚀 A magnificent organizer and master of navigation! The first member of our team demonstrated the best qualities of a leader, coordinating and organizing our work on the project. His unparalleled skills allowed us to create a flawless navigation system that makes the user experience as convenient as possible. In addition, he put tremendous effort into developing and implementing complex login and messaging functionality between pages. Thanks to his talents and professionalism, users of our project can easily move around and interact, creating a harmonious and productive atmosphere. 💪💻✨',
  },
  {
    name: 'Anastasiya Alisenok',
    role: 'Master of backend',
    bio: 'I was born in Minsk. I finished Belorussian state economic university, faculty Banking and finance. I work in bank for 12 years. In december I began to study JavaScript with RSSchool JS/Front-end/stage#0. 9 months of hard work and learning and so I completed the final task JS/Front-end/stage#2. In this task I made all requests to the commertools API, created registration form and profile of customer. Also I participated in the implementation of the catalog page and shopping cart.',
    photo: 'https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg',
    gh: 'https://github.com/AnastasiyaAlisenok',
    contr:
      '👨‍💻🔥 The second team member took on the complex task of server management! 🌟 He successfully handled authorization requests, project information retrieval, product management, and much more. 📋🔒 He also created an extensive and detailed registration form, reflecting his ability to work with one of the most complex tools of this task - “CommerceTools”. 💪🛠️ His dedication and skill in performing this complex task played a crucial role in ensuring flawless and efficient server operation.',
  },
  {
    name: 'Dmitriy Kulkov',
    role: 'Member',
    bio: 'I was born in the beautiful city of Mogilev. After finishing 11 grades of school, I decided to go to the army, where I gained valuable experience and learned to overcome difficulties. In search of my calling, I tried myself in different fields, and finally found my passion in the field of information technology. At the moment, I am actively developing in the IT field, studying the latest technologies and applying them in practice. This is a fascinating field where I can combine creativity, logic, and a desire for constant development.',
    photo:
      'https://sun9-12.userapi.com/impg/p6FwpXfSBPZlWrINHDAzaarYUV1gZMfdTPdM1g/DQKYby9q7Jc.jpg?size=1620x2160&quality=96&sign=ddf4c06c14f66f03102ae64daa45ebe6&type=album',
    gh: 'https://github.com/Kain4ra',
    contr:
      '🎨📱 The third team member was responsible for the site’s adaptability. 🖌️ He created an attractive design that combines aesthetics and functionality. 🌈📱 Thanks to his efforts, the site has become pleasing to the eye and easy to use regardless of the device or screen resolution. 🌟🧪 In addition, he actively tested the site’s functionality to ensure its correct operation and debugging. 👨‍💻🔍',
  },
];
