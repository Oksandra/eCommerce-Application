import React, { FC, useState } from 'react';
import { IMemberInfo } from './members-info';
import './Member-card.scss';
import icon from '../../assets/images/github-icon.png';

interface MemberProps {
  member: IMemberInfo;
}

export const Member: FC<MemberProps> = ({ member }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (): void => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="member-card" onClick={handleClick} aria-hidden="true">
      <div className="member-card__photo">
        <img src={member.photo} alt="member" />
      </div>
      <h2 className="member-card__name">
        <a
          href={member.gh}
          target="_blank"
          rel="noreferrer"
          onClick={(event): void => {
            event.stopPropagation();
          }}
        >
          {member.name}
          <img className="member-card__github" src={icon} alt="github icon" />
        </a>
      </h2>
      <p className="member-card__role">{member.role}</p>
      <p className="member-card__bio">{member.bio}</p>
      {isClicked && (
        <div
          className="member-card__modal"
          onClick={handleClick}
          aria-hidden="true"
        >
          <h3>Contributions</h3>
          <p>{member.contr}</p>
        </div>
      )}
    </div>
  );
};
