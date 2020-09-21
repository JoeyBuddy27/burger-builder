import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';


configure({adapter: new Adapter()})

describe('<NavigationItems />', ()=> {
	let wrapper;
	beforeEach(()=> {
		wrapper = shallow(<NavigationItems />);
	});

	it('should render two <NavigationItem /> elements if NOT authenticated', 
		()=> {
			expect(wrapper.find(NavigationItem)).toHaveLength(2);	//look into wrapper to find 2 NavigationItems 
		});

	it('should render three <NavigationItem /> elements if IS authenticated', 
		()=> {
			//wrapper = shallow(<NavigationItems isAuthenticated />)
			wrapper.setProps({isAuthenticated: true});
			expect(wrapper.find(NavigationItem)).toHaveLength(3);	//look into wrapper to find 3 NavigationItems 
		});

	it('if logout is available', 
		()=> {
			 wrapper.setProps({isAuthenticated: true});
			expect(wrapper.contains(<NavigationItem link="/logout"> Logout </NavigationItem> )).toEqual(true);	
		});



}); 