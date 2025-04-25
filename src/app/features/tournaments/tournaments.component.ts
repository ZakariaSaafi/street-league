import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatBadgeModule } from "@angular/material/badge"
import { MatTabsModule } from "@angular/material/tabs"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { listAnimation, fadeAnimation } from "../../shared/animations/animations"

interface Tournament {
  id: number
  name: string
  image: string
  sport: string
  startDate: Date
  endDate: Date
  location: string
  status: "upcoming" | "ongoing" | "completed"
  registrationOpen: boolean
  teamCount: number
  maxTeams: number
  description: string
  prize: string
  entryFee: number
  isRegistered: boolean
}

@Component({
  selector: "app-tournaments",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="page-container" @fadeAnimation>
      <div class="page-header">
        <h1 class="page-title">Tournaments</h1>
        <p class="page-description">Find and join exciting tournaments in your area</p>
      </div>
      
      <mat-tabs class="tournament-tabs" animationDuration="300ms">
        <mat-tab label="All Tournaments">
          <div class="tab-content">
            <div class="tournaments-grid" @listAnimation>
              <mat-card *ngFor="let tournament of tournaments" class="tournament-card" [ngClass]="'status-' + tournament.status">
                <div class="tournament-image">
                  <img [src]="tournament.image" [alt]="tournament.name">
                  <div class="tournament-status">
                    <span class="status-badge" [ngClass]="tournament.status">
                      {{ tournament.status === 'upcoming' ? 'Upcoming' : tournament.status === 'ongoing' ? 'Live Now' : 'Completed' }}
                    </span>
                  </div>
                </div>
                
                <mat-card-content class="tournament-content">
                  <div class="tournament-header">
                    <h2 class="tournament-name">{{ tournament.name }}</h2>
                    <mat-chip-set>
                      <mat-chip color="primary" [highlighted]="true">{{ tournament.sport }}</mat-chip>
                    </mat-chip-set>
                  </div>
                  
                  <div class="tournament-details">
                    <div class="detail-item">
                      <mat-icon>event</mat-icon>
                      <span>{{ tournament.startDate | date:'mediumDate' }} - {{ tournament.endDate | date:'mediumDate' }}</span>
                    </div>
                    <div class="detail-item">
                      <mat-icon>location_on</mat-icon>
                      <span>{{ tournament.location }}</span>
                    </div>
                    <div class="detail-item">
                      <mat-icon>groups</mat-icon>
                      <span>{{ tournament.teamCount }}/{{ tournament.maxTeams }} Teams</span>
                    </div>
                    <div class="detail-item">
                      <mat-icon>emoji_events</mat-icon>
                      <span>{{ tournament.prize }}</span>
                    </div>
                  </div>
                  
                  <div class="tournament-progress">
                    <div class="progress-label">
                      <span>Registration</span>
                      <span>{{ tournament.teamCount }}/{{ tournament.maxTeams }}</span>
                    </div>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="(tournament.teamCount / tournament.maxTeams) * 100"
                      [color]="tournament.teamCount >= tournament.maxTeams ? 'warn' : 'primary'">
                    </mat-progress-bar>
                  </div>
                  
                  <p class="tournament-description">{{ tournament.description }}</p>
                </mat-card-content>
                
                <mat-card-actions class="tournament-actions">
                  <button mat-button color="primary" [routerLink]="['/tournaments', tournament.id]">
                    <mat-icon>info</mat-icon>
                    Details
                  </button>
                  
                  <button 
                    mat-raised-button 
                    [color]="tournament.isRegistered ? 'accent' : 'primary'"
                    [disabled]="!tournament.registrationOpen || tournament.teamCount >= tournament.maxTeams"
                    (click)="toggleRegistration(tournament)">
                    <mat-icon>{{ tournament.isRegistered ? 'how_to_reg' : 'app_registration' }}</mat-icon>
                    {{ tournament.isRegistered ? 'Registered' : 'Register' }}
                  </button>
                </mat-card-actions>
                
                <div class="tournament-ribbon" *ngIf="tournament.status === 'ongoing'">
                  <span>LIVE</span>
                </div>
              </mat-card>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab label="Upcoming">
          <div class="tab-content">
            <div class="tournaments-grid" @listAnimation>
              <mat-card *ngFor="let tournament of upcomingTournaments" class="tournament-card status-upcoming">
                <!-- Same content as above -->
              </mat-card>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab label="Ongoing">
          <div class="tab-content">
            <div class="tournaments-grid" @listAnimation>
              <mat-card *ngFor="let tournament of ongoingTournaments" class="tournament-card status-ongoing">
                <!-- Same content as above -->
              </mat-card>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab label="My Tournaments">
          <div class="tab-content">
            <div class="tournaments-grid" @listAnimation>
              <mat-card *ngFor="let tournament of myTournaments" class="tournament-card" [ngClass]="'status-' + tournament.status">
                <!-- Same content as above -->
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tabs>
    </div>
  `,
  styles: [
    `
    .page-container {
      padding: var(--space-6);
    }
    
    .page-header {
      margin-bottom: var(--space-6);
      text-align: center;
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
      background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }
    
    .page-description {
      color: var(--muted-foreground);
      font-size: 1.1rem;
    }
    
    .tournament-tabs {
      margin-bottom: var(--space-6);
    }
    
    .tab-content {
      padding: var(--space-6) 0;
    }
    
    .tournaments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-6);
    }
    
    .tournament-card {
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform var(--transition), box-shadow var(--transition);
      position: relative;
    }
    
    .tournament-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .tournament-image {
      height: 180px;
      position: relative;
      overflow: hidden;
    }
    
    .tournament-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition);
    }
    
    .tournament-card:hover .tournament-image img {
      transform: scale(1.05);
    }
    
    .tournament-status {
      position: absolute;
      top: var(--space-3);
      right: var(--space-3);
      z-index: 1;
    }
    
    .status-badge {
      display: inline-block;
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      box-shadow: var(--shadow);
    }
    
    .status-badge.upcoming {
      background-color: var(--primary-500);
      color: white;
    }
    
    .status-badge.ongoing {
      background-color: var(--success-500);
      color: white;
    }
    
    .status-badge.completed {
      background-color: var(--neutral-500);
      color: white;
    }
    
    .tournament-content {
      padding: var(--space-4);
    }
    
    .tournament-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-3);
    }
    
    .tournament-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: var(--foreground);
    }
    
    .tournament-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2) var(--space-4);
      margin-bottom: var(--space-4);
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      color: var(--muted-foreground);
      font-size: 0.875rem;
    }
    
    .detail-item mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      margin-right: var(--space-1);
      color: var(--primary-500);
    }
    
    .tournament-progress {
      margin-bottom: var(--space-4);
    }
    
    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }
    
    .tournament-description {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      margin-bottom: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .tournament-actions {
      display: flex;
      justify-content: space-between;
      padding: var(--space-2) var(--space-4) var(--space-4);
    }
    
    .tournament-ribbon {
      position: absolute;
        var(--space-4) var(--space-4);
    }
    
    .tournament-ribbon {
      position: absolute;
      top: 20px;
      left: -30px;
      background-color: var(--success-500);
      color: white;
      padding: var(--space-1) var(--space-6);
      transform: rotate(-45deg);
      font-size: 0.75rem;
      font-weight: 700;
      box-shadow: var(--shadow);
      z-index: 2;
    }
    
    .tournament-ribbon span {
      display: block;
      text-align: center;
    }
    
    .status-upcoming {
      border-top: 3px solid var(--primary-500);
    }
    
    .status-ongoing {
      border-top: 3px solid var(--success-500);
    }
    
    .status-completed {
      border-top: 3px solid var(--neutral-500);
    }
    
    @media (max-width: 768px) {
      .tournaments-grid {
        grid-template-columns: 1fr;
      }
      
      .tournament-details {
        grid-template-columns: 1fr;
      }
    }
  `,
  ],
  animations: [listAnimation, fadeAnimation],
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = []
  upcomingTournaments: Tournament[] = []
  ongoingTournaments: Tournament[] = []
  myTournaments: Tournament[] = []

  ngOnInit(): void {
    // Mock data
    this.tournaments = [
      {
        id: 1,
        name: "Summer Slam Basketball",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        sport: "Basketball",
        startDate: new Date("2023-07-15"),
        endDate: new Date("2023-07-20"),
        location: "Central Park Courts, NY",
        status: "upcoming",
        registrationOpen: true,
        teamCount: 12,
        maxTeams: 16,
        description: "The biggest street basketball tournament of the summer. Compete for cash prizes and street cred!",
        prize: "$5,000",
        entryFee: 100,
        isRegistered: false,
      },
      {
        id: 2,
        name: "Downtown Streetball Challenge",
        image:
          "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        sport: "Basketball",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2023-06-10"),
        location: "Downtown Courts, LA",
        status: "ongoing",
        registrationOpen: false,
        teamCount: 16,
        maxTeams: 16,
        description: "Intense streetball competition in the heart of downtown. Show your skills and win big!",
        prize: "$3,000",
        entryFee: 75,
        isRegistered: true,
      },
      {
        id: 3,
        name: "Beach Volleyball Open",
        image:
          "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1007&q=80",
        sport: "Volleyball",
        startDate: new Date("2023-08-05"),
        endDate: new Date("2023-08-07"),
        location: "Venice Beach, CA",
        status: "upcoming",
        registrationOpen: true,
        teamCount: 8,
        maxTeams: 24,
        description: "Sun, sand, and competitive volleyball. Join us for a weekend of beach volleyball action!",
        prize: "$2,500",
        entryFee: 50,
        isRegistered: false,
      },
      {
        id: 4,
        name: "Urban Soccer Cup",
        image:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1293&q=80",
        sport: "Soccer",
        startDate: new Date("2023-05-10"),
        endDate: new Date("2023-05-15"),
        location: "Urban Fields, Chicago",
        status: "completed",
        registrationOpen: false,
        teamCount: 20,
        maxTeams: 20,
        description: "The premier street soccer tournament. Fast-paced 5v5 action on urban pitches.",
        prize: "$4,000",
        entryFee: 120,
        isRegistered: true,
      },
      {
        id: 5,
        name: "Skate Park Showdown",
        image:
          "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        sport: "Skateboarding",
        startDate: new Date("2023-07-22"),
        endDate: new Date("2023-07-23"),
        location: "Freedom Skate Park, Miami",
        status: "upcoming",
        registrationOpen: true,
        teamCount: 30,
        maxTeams: 50,
        description: "Show off your best tricks and compete against top skaters from around the country.",
        prize: "$2,000",
        entryFee: 25,
        isRegistered: false,
      },
      {
        id: 6,
        name: "Midnight Basketball League",
        image:
          "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        sport: "Basketball",
        startDate: new Date("2023-06-15"),
        endDate: new Date("2023-08-15"),
        location: "Night Courts, NYC",
        status: "ongoing",
        registrationOpen: false,
        teamCount: 10,
        maxTeams: 10,
        description: "Late night basketball action under the lights. Weekly games throughout the summer.",
        prize: "$6,000",
        entryFee: 150,
        isRegistered: true,
      },
    ]

    this.upcomingTournaments = this.tournaments.filter((t) => t.status === "upcoming")
    this.ongoingTournaments = this.tournaments.filter((t) => t.status === "ongoing")
    this.myTournaments = this.tournaments.filter((t) => t.isRegistered)
  }

  toggleRegistration(tournament: Tournament): void {
    tournament.isRegistered = !tournament.isRegistered

    if (tournament.isRegistered) {
      tournament.teamCount++
      this.myTournaments.push(tournament)
    } else {
      tournament.teamCount--
      this.myTournaments = this.myTournaments.filter((t) => t.id !== tournament.id)
    }
  }
}
