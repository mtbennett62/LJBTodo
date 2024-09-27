import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useAuth } from "./provider/authProvider";


const Navigation = () => {
    const { logout, token } = useAuth();

    return (
        <NavigationMenu.Root>
            <NavigationMenu.Item>
                <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
            {token &&
                <><NavigationMenu.Item>
                    <NavigationMenu.Link href="/settings">Settings</NavigationMenu.Link>
                </NavigationMenu.Item><NavigationMenu.Item>
                        <NavigationMenu.Link onClick={logout} href="/">Logout</NavigationMenu.Link>
                    </NavigationMenu.Item></>
            }
            {!token &&
                <><NavigationMenu.Item>
                    <NavigationMenu.Link href="/login">Login</NavigationMenu.Link>
                </NavigationMenu.Item><NavigationMenu.Item>
                        <NavigationMenu.Link href="/register"> Register </NavigationMenu.Link>
                    </NavigationMenu.Item></>
            }
        </NavigationMenu.Root>
    );

};

export default Navigation;