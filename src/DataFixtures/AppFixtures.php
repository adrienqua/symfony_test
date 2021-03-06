<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     *
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');


        for ($u=0; $u < 10; $u++) {
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setFirstname($faker->firstName())
                     ->setLastname($faker->lastName)
                     ->setEmail($faker->email)
                     ->setPassword($hash);
                    
            $manager->persist($user);


            for ($c=0; $c < 30; $c++) {
                $chrono = 1;
    
                $customer = new Customer();
                $customer->setFirstname($faker->firstName())
                         ->setLastname($faker->lastName)
                         ->setAddress($faker->address)
                         ->setEmail($faker->email)
                         ->setPhone($faker->phoneNumber)
                         ->setUser($user);
    
                $manager->persist($customer);
    
                for ($i=0; $i < mt_rand(3, 10); $i++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000))
                             ->setSentAt($faker->dateTimeBetween('-6 months'))
                             ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                             ->setCustomer($customer)
                             ->setChrono($chrono);
                        
                    $chrono++;
        
                    $manager->persist($invoice);
                };
            };
        };

        

        
        


        $manager->flush();
    }
}
