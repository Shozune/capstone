import "./ServiceCard.css";

const ServiceCard = ({ title, description, iconBg = "#dbeafe" }) => {
  return (
    <div className="service-card">
      <div className="service-icon" style={{ backgroundColor: iconBg }}>
        {/* Icon placeholder */}
      </div>
      <div className="service-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;