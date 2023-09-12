import { styled } from "styled-components";
import LogOut from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DarkmodeToggle from "./DarkmodeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkmodeToggle />
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
