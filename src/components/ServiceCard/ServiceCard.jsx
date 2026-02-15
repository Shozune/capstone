import "./ServiceCard.css";

const ServiceCard = ({ title, description, icon, iconBg = "#dbeafe" }) => {
  return (
    <div className="service-card">
      <div className="service-icon" style={{ backgroundColor: iconBg }}>
        {icon && <img src={icon} alt={title} className="icon-image" />}
      </div>
      <div className="service-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;