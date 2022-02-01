import { Icon } from "../Icon/Icon";
import { Container, MobileSearchIcon } from "./style";
import settings from "../../assets/Icons/settings.svg";
import search from "../../assets/Icons/search.svg";
import notifications from "../../assets/Icons/notifications.svg";
import { Avatar } from "../Avatar/Avatar";

type PersonalProps = {
  onClickSearchIcon: () => any;
};

export const Personal: React.FC<PersonalProps> = ({ onClickSearchIcon }) => {
  return (
    <Container>
      <MobileSearchIcon onClick={onClickSearchIcon}>
        <Icon src={search} ml={14} />
      </MobileSearchIcon>
      <Icon src={settings} ml={14} />
      <Icon src={notifications} ml={14} />
      <Avatar size={"sm"}>AB</Avatar>
    </Container>
  );
};
