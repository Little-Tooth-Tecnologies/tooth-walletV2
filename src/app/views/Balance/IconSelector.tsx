import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, IconButton, Menu, PaperProvider } from 'react-native-paper';


export interface IconInt {
    label: string;
    iconType: string | any;
    color: string;
}
interface IconSelector_Props {
    color: string;    
    onIconSelect: (selectedIcon: IconInt) => void;
}

const IconSelector = ({...props} :IconSelector_Props) => {
    const [open, setOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('credit-card-outline');

    const icons: IconInt[] = [
        { label: 'Cartão de Crédito', iconType: 'credit-card', color: props.color },
        { label: 'Cartão de Débito', iconType: 'credit-card-outline' , color: props.color },
        { label: 'Dinheiro', iconType: 'cash' , color: props.color},
    ];

    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);

    const handleIconSelect = (icon: IconInt) => {
        setSelectedIcon(icon.iconType);
        props.onIconSelect(icon);
        closeMenu();
    }


    return (
        <PaperProvider>
            <View style={LocalStyles.container}>
                <Menu
                    visible={open}
                    onDismiss={closeMenu}
                    anchor={<IconButton icon={selectedIcon} iconColor={props.color} size={30} onPress={openMenu} />}
                    style={LocalStyles.menuStyle}
                >
                    {icons.map((icon) => (
                        <Menu.Item
                            title={icon.label}
                            key={icon.label}
                            leadingIcon={(props) => <Icon {...props} source={icon.iconType} color={icon.color}/>}
                            onPress={() => handleIconSelect(icon)}
                            style={{gap: 20}}                          
                        />
                    ))}
                </Menu>
            </View>
        </PaperProvider>
    );
};

const LocalStyles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center', 
        zIndex: 999,                    
    },
    menuStyle:{
        position: 'absolute', 
        top: 0, 
        left: 0,    
        marginTop: 40,
        width: 200
    }
})


export default IconSelector;
