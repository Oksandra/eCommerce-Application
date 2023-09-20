import React from 'react';
import promocodeImage from '../../assets/images/promocode_img.png';
import coupon from '../../assets/images/coupon.png';
import rss from '../../assets/images/rss.png';
import './PromocodeSection.scss';

const PromocodeSection = (): JSX.Element => {
  return (
    <section className="promocode-section">
      <img
        className="promocode-section__main-image"
        src={promocodeImage}
        width="400"
        alt="promocode-img"
      />
      <div className="promocode-section__info">
        <p className="promocode-section__info-text">
          Make the most magical night of the year memorable with our wine
          collection!
        </p>
        <p className="promocode-section__info-text">
          Get <strong>10%</strong> off with our WIN4IK promocode or{' '}
          <strong>20%</strong> with promocode RSSCHOOl.
        </p>
        <div className="promocode-section__buttons">
          <button className="promocode-section__info-button" type="button">
            <img src={coupon} width="200" alt="coupon" />
          </button>
          <button className="promocode-section__info-button" type="button">
            <img src={rss} width="200" alt="coupon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromocodeSection;
