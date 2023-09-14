import React, { FC } from 'react';
import { Member } from '../../components/Members/Member-card';
import { MEMBERS } from '../../components/Members/members-info';
import './AboutUs.scss';

export const AboutUs: FC = () => {
  return (
    <div className="about-us">
      <h2 className="about-us__title">About Us</h2>
      <div className="about-us__members">
        <h3 className="subtitle">Members👥</h3>
        <div className="members__wrap">
          <Member member={MEMBERS[0]} />
          <Member member={MEMBERS[1]} />
          <Member member={MEMBERS[2]} />
        </div>
      </div>
      <div className="about-us__collaboration">
        <h3 className="subtitle">Collaboration🤝</h3>
        <p className="collaboration__text">
          👥 For effective project implementation and successful results, the
          team used various tools and collaboration methods.
        </p>
        <p className="collaboration__text">
          📋 The use of the ClickUp tool allowed the team to organize work, set
          and distribute tasks. This tool helped to keep track of task progress,
          set deadlines, share files and comments.
        </p>
        <p className="collaboration__text">
          💬 For communication and discussion of work processes, the team used
          Telegram, GitHub, and Google Meet. Team chats were used for
          discussions, clarifications, and mutual assistance.
        </p>
        <p className="collaboration__text">
          📞 Regular calls helped maintain communication within the team,
          discuss project progress, exchange ideas and plans. This was an
          important point for coordinating actions and identifying possible
          problems.
        </p>
        <p className="collaboration__text">
          🤯 Brainstorming allowed the team to generate new ideas, find
          solutions for complex tasks, and make collective decisions.
        </p>
        <p className="collaboration__text">
          🤝 Mutual assistance and support in the team helped to cope with
          difficulties and quickly solve problems. The team was ready to help
          and share knowledge, which improved the quality of work and project
          results.
        </p>
        <p className="collaboration__text">
          📚 In addition, the team sought to master and develop new skills to
          increase efficiency.
        </p>
        <p className="collaboration__text">
          🚀 All these techniques and approaches helped the team to successfully
          work together, cope with challenges, and achieve project goals.
        </p>
      </div>
      <a
        className="about-us__logo"
        href="https://rs.school/"
        target="_blank"
        rel="noreferrer"
      >
        <img src="https://rs.school/images/rs_school.svg" alt="logo" />
      </a>
    </div>
  );
};
