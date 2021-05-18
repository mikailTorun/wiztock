export interface Customer {
  customer_id: number;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_town: string;
  customer_city: string;
  customer_postal_code: string;
  customer_is_corporate: number;
  customer_is_customer: number;
  customer_is_supplier: number;
  corporate_title: string;
  corporate_short_name: string;
  corporate_tax_office: string;
  corporate_tax_number: string;
  individual_name_surname: string;
  individual_ssn: string;
}
