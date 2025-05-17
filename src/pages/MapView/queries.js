import { gql } from '@apollo/client';

export const GET_ALL_PROPERTIES = gql`
  query GetAllProperties {
    getAllProperties {
      id
      lat
      lon
      address
      zonedist1
      owner
      lotarea
      property_size
      numfloors
      unitsres
      unitstotal
      building_year
      acquisition_date
      last_sale_date
      BBL
      valuation
      property_value
      property_type
      location
      owner_net_worth
    }
  }
`;
