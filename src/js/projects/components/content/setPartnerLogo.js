function getSetPartnerLogoFn() {
  const partnerLogo = document.querySelector('[data-project="logo"]');

  return function setPartnerLogo({ logo }) {
    partnerLogo.setAttribute('src', logo);
  };
};

const setPartnerLogo = getSetPartnerLogoFn();

export default setPartnerLogo;
