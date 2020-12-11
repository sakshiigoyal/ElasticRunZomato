import React from 'react';
import {
  View,
  Switch,
  Text,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import {AppConstants} from '../utils/Constant';
import {styles} from './Styles';
import {loaderView} from './Loader';
import Services from '../utils/Services';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: '',
      selectedEstablishment: '',
      selectedCategories: '',
      selectedRestaurant: {},

      location: '',
      locationList: [],
      categoriesRestList: [],
      showRestCategories: false,
      showCategories: false,
      categoriesList: [],
      showLocation: true,
      restaurantList: [],
    };
  }

  componentDidMount() {
    Services.fetchCategories().then((response) => {
      this.setState({
        categoriesList: response.categories,
      });
    });
  }

  fetchLocation = (value) => {
    Services.fetchLocation(value).then((response) => {
      const {location_suggestions} = response;
      this.setState({
        locationList: location_suggestions,
      });
    });
  };

  fetchCategories = () => {
    Services.fetchEstablishments(this.state?.selectedLocation).then(
      (response) => {
        console.log('fetchCategories: ', response);
        this.setState({
          categoriesRestList: response.establishments,
        });
      },
    );
  };

  fetchRestaurant = () => {
    Services.fetchRestaurants(
      this.state.selectedLocation,
      this.state.selectedEstablishment,
      this.state.selectedCategories,
    ).then((response) => {
      this.setState({
        restaurantList: response.restaurants,
      });
    });
  };

  saveRestaurant = () => {
    let updatedList = this.props.saveRestaurantReducer.restaurantList;
    updatedList.push(this.state.selectedRestaurant);

    this.props.saveRestaurant(updatedList);
  };

  render() {
    return (
      <View style={{flex: 1, marginBottom: 30}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TextInput
              style={{border: 2, borderColor: 'black', borderWidth: 4}}
              onChangeText={(value) => {
                this.fetchLocation(value);
                this.setState((prev) => ({
                  location: value,
                  showLocation: !prev.showLocation,
                }));
              }}
              value={this.state.location}
            />
            {this.state.showLocation && (
              <FlatList
                data={this.state.locationList}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState((prev) => ({
                        selectedLocation: item.id,
                        showLocation: !prev.showLocation,
                      }));
                    }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                this.fetchCategories();
                this.setState((prev) => ({
                  showRestCategories: !prev.showRestCategories,
                }));
              }}>
              <Text style={{border: 2, borderColor: 'black', borderWidth: 4}}>
                Get Restaurent Categories
              </Text>
            </TouchableOpacity>
            {this.state.showRestCategories && (
              <FlatList
                data={this.state.categoriesRestList}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState((prev) => ({
                        showRestCategories: !prev.showRestCategories,
                        selectedEstablishment: item.establishment.id,
                      }));
                    }}>
                    <Text>{item.establishment.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.establishment.id}
              />
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                this.setState((prev) => ({
                  showCategories: !prev.showCategories,
                }));
              }}>
              <Text style={{border: 2, borderColor: 'black', borderWidth: 4}}>
                Category
              </Text>
            </TouchableOpacity>
            {this.state.showCategories && (
              <FlatList
                data={this.state.categoriesList}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState((prev) => ({
                        showCategories: !prev.showCategories,
                        selectedCategories: item.categories.id,
                      }));
                    }}>
                    <Text>{item.categories.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.categories.id}
              />
            )}
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                this.fetchRestaurant();
              }}>
              <Text style={{border: 2, borderColor: 'black', borderWidth: 4}}>
                Get Restaurant
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={this.state.restaurantList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{marginVertical: 8}}
              onPress={() => {
                this.setState({
                  selectedRestaurant: item,
                });
              }}>
              <Text>{`Name - ${item.restaurant.location.address}`}</Text>
              <Text>{`Address - ${item.restaurant.location.address}`}</Text>
              <Text>{`Average cost - ${item.restaurant.average_cost_for_two}`}</Text>
              <Text>{`Timings - ${item.restaurant.timings}`}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.restaurant.id}
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            backgroundColor: 'red',
          }}
          onPress={() => {
            this.saveRestaurant();
          }}>
          <Text style={{border: 2, borderColor: 'black', borderWidth: 4}}>
            Get Restaurant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'red',
          }}
          onPress={() => {
            console.log('props:: ', this.props);
            this.props.navigation.navigate('SavedRestaurant');
          }}>
          <Text style={{border: 2, borderColor: 'black', borderWidth: 4}}>
            View Saved Restaurants
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MainScreen;
