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

import { AppConstants } from '../utils/Constant';
import { styles } from './Styles';
import Services from '../utils/Services';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: '',
      selectedEstablishment: '',
      selectedCategories: '',
      selectedRestaurant: {},

      selectedLocationName: '',
      selectedEstablishmentName: '',
      selectedCategoriesName: '',
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
      const { location_suggestions } = response;
      this.setState({
        locationList: location_suggestions,
      });
    });
  };

  fetchCategories = () => {
    Services.fetchEstablishments(this.state?.selectedLocation).then(
      (response) => {
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
      response.restaurants.map((item) => {
        item.select = false;
      });
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
      <View style={styles.mainContainer}>
        <View style={styles.rowStyle}>
          <View style={styles.flexStyle}>
            <TextInput
              placeholder={AppConstants.Location}
              style={styles.locationStyle}
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
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.selectedItems}
                    onPress={() => {
                      this.setState((prev) => ({
                        selectedLocation: item.id,
                        showLocation: !prev.showLocation,
                        location: item.name,
                      }));
                    }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
          <View style={styles.flexStyle}>
            <TouchableOpacity
              onPress={() => {
                this.fetchCategories();
                this.setState((prev) => ({
                  showRestCategories: !prev.showRestCategories,
                }));
              }}>
              <Text
                style={styles.textStyle}>
                {this.state.selectedEstablishmentName
                  ? this.state.selectedEstablishmentName : AppConstants.getRestaurentCategories}
              </Text>
            </TouchableOpacity>
            {this.state.showRestCategories && (
              <FlatList
                data={this.state.categoriesRestList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.selectedItems}
                    onPress={() => {
                      this.setState((prev) => ({
                        showRestCategories: !prev.showRestCategories,
                        selectedEstablishment: item.establishment.id,
                        selectedEstablishmentName: item.establishment.name,
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

        <View style={styles.bottomRow}>
          <View style={styles.flexStyle}>
            <TouchableOpacity
              onPress={() => {
                this.setState((prev) => ({
                  showCategories: !prev.showCategories,
                }));
              }}>
              <Text
                style={styles.textStyle}>
                {this.state.selectedCategoriesName
                  ? this.state.selectedCategoriesName : AppConstants.category}
              </Text>
            </TouchableOpacity>
            {this.state.showCategories && (
              <FlatList
                data={this.state.categoriesList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.selectedItems}

                    onPress={() => {
                      this.setState((prev) => ({
                        showCategories: !prev.showCategories,
                        selectedCategories: item.categories.id,
                        selectedCategoriesName: item.categories.name,
                      }));
                    }}>
                    <Text>{item.categories.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.categories.id}
              />
            )}
          </View>
          <View style={styles.flexStyle}>
            <TouchableOpacity
              onPress={() => {
                this.fetchRestaurant();
              }}>
              <Text
                style={styles.textStyle}>
                {AppConstants.getRestaurant}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          extraData={this.state}
          data={this.state.restaurantList}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.restaurant.id}
              style={[
                { marginVertical: 8 },
                item.select
                  ? { backgroundColor: 'orange' }
                  : { backgroundColor: 'white' },
              ]}
              onPress={() => {
                this.state.restaurantList.map((value) => {
                  if (item.restaurant.id === value.restaurant.id) {
                    value.select = true;
                  }
                  else
                    value.select = false;
                  return value;
                });

                this.setState({
                  selectedRestaurant: item,
                });
              }}>
              <Text>{`Name - ${item.restaurant.name}`}</Text>
              <Text>{`Address - ${item.restaurant.location.address}`}</Text>
              <Text>{`Average cost - ${item.restaurant.average_cost_for_two}`}</Text>
              <Text>{`Timings - ${item.restaurant.timings}`}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.restaurant.id}
        />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            this.saveRestaurant();
          }}>
          <Text style={styles.saveText}>
            {AppConstants.saveRestaurant}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle, { bottom: 0 }]}
          onPress={() => {
            this.props.navigation.navigate('SavedRestaurant');
          }}>
          <Text style={styles.saveText}>
            {AppConstants.viewSavedRestaurants}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MainScreen;
