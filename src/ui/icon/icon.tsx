import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  library,
} from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { MouseEventHandler } from "react";

library.add(fab);

type Props = {
  icon: IconDefinition;
  handleClick: MouseEventHandler<HTMLDivElement>;
};

export const SocialIconElement = ({ icon, handleClick }: Props) => {
  return (
    <>
      <div onClick={handleClick}>
        <FontAwesomeIcon icon={icon} />;
      </div>
    </>
  );
};
