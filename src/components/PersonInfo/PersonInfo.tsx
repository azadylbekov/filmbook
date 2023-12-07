
export default function PersonInfo({ person }) {

	const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthName = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.getFullYear();
    return `${day} ${monthName} ${year}`;
  };

  return (
    <>
      <h3 className="lg:text-3xl md:text-2xl text-xl mb-2">{person.name}</h3>
      <h3 className="md:text-xl text-lg mb-2">{person.known_for_department}</h3>
      <h3 className="md:text-2xl text-xl mb-2">
        {formatDate(person.birthday)}{" "}
        {person.deathday && ` - ${formatDate(person.deathday)}`}
      </h3>
      <h3 className="md:text-2xl text-xl mb-2">{person.place_of_birth}</h3>
    </>
  );
}
