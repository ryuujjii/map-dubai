import imgLoader from '@/projects/components/content/imgLoader';

function getSetPartnerLogoFn() {
  const partnerLogo = document.querySelector('[data-project="logo"]');
  imgLoader(partnerLogo)
  return function setPartnerLogo({ logo }) {
    partnerLogo.setAttribute('src', logo);
  };
};

const setPartnerLogo = getSetPartnerLogoFn();

export default setPartnerLogo;
