import "./ServicesCard.css";

const ServicesCard = ({ title, description }) => {
  return (
    <div className="service-card">
      <div className="icon">💙</div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
