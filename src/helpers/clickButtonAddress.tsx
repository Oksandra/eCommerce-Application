const clickButtonAddress = (event: React.MouseEvent): void => {
  const tabButtons = document.querySelectorAll(
    '.registration-form__tab-button'
  );
  const tabContents = document.querySelectorAll(
    '.registration-form__tab-content'
  );
  const tabIndex = Number((event.target as HTMLButtonElement).id);
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove('open');
  });
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove('active');
  });
  tabContents[tabIndex].classList.add('open');
  tabButtons[tabIndex].classList.add('active');
};

export default clickButtonAddress;
