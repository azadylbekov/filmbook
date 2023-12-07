import { Link } from "react-router-dom";
import styles from './NavLinks.module.scss'
import { NAV_LINKS } from "@/utils/const";

export default function NavLinks({ classes }: { classes: string }) {
	return (
		<>
			{NAV_LINKS.map((link, index) => {
				return (
					<li key={index}>
						<Link to={link.href} className={styles.headerNavLink + " " + classes}>
							{link.title}
						</Link>
					</li>
				);
			})
		}
		</>
	)
}
