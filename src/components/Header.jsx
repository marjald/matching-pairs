import PropTypes from "prop-types";

export default function Header({ heading }) {
  return (
    <header className="flex flex-col items-center mt-8 mb-8 md:mb-16">
      <h1 className="font-title text-3xl text-yellow-200">{heading}</h1>
    </header>
  );
}

Header.propTypes = {
  heading: PropTypes.string.isRequired,
};
